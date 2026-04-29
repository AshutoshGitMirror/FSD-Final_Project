import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authFetch, getUser } from '../utils/auth';
import { backendUrl } from '../config/api';

const QuizPage = () => {
  const { subject, chapter } = useParams();
  const user = getUser();

  const [quizBank, setQuizBank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Timer & Feedback States
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // ── Fetch Quiz Data from DB ──────────────────────────────────
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(backendUrl(`/api/quiz/${encodeURIComponent(subject)}/${encodeURIComponent(chapter)}`));
        const data = await res.json();
        if (data.questions) {
          setQuizBank(data.questions);
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [subject, chapter]);

  const handleNext = useCallback(() => {
    if (currentQuestion < quizBank.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setSelectedIdx(null);
      setShowFeedback(false);
      setIsLocked(false);
    } else {
      setFinished(true);
    }
  }, [currentQuestion, quizBank.length]);

  // Timer Effect
  useEffect(() => {
    if (finished || isLocked || loading || quizBank.length === 0) return;

    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished, isLocked, handleNext, loading, quizBank.length]);

  // Persistence Effect
  useEffect(() => {
    if (finished && quizBank.length > 0) {
      const saveResult = async () => {
        try {
          await authFetch(backendUrl('/api/progress'), {
            method: 'POST',
            body: JSON.stringify({
              subjectName: subject,
              chapterName: chapter,
              quizScore: score,
              totalQuestions: quizBank.length,
              isCompleted: true
            })
          });
          console.log('Progress saved successfully');

          // Auto-initialize spaced repetition for this chapter
          try {
            await authFetch(backendUrl('/api/spaced-repetition/init'), {
              method: 'POST',
              body: JSON.stringify({
                subjectName: subject,
                chapterName: chapter
              })
            });
            console.log('Spaced repetition concepts initialized');
          } catch (srErr) {
            console.warn('SR init skipped:', srErr);
          }
        } catch (err) {
          console.error('Failed to save progress:', err);
        }
      };
      saveResult();
    }
  }, [finished, score, subject, chapter, quizBank.length]);

  const handleAnswer = (idx) => {
    if (isLocked) return;

    setSelectedIdx(idx);
    setIsLocked(true);
    setShowFeedback(true);

    if (idx === quizBank[currentQuestion].ans) {
      setScore(s => s + 1);
    }

    // Short delay for feedback before moving on
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="w-16 h-16 border-8 border-black border-t-neo-pink rounded-full animate-spin mb-4 mx-auto"></div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Fetching Database Quiz...</h2>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] p-8">
        <div className="card-neo max-w-lg w-full p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-neo-pink"></div>
          <span className="text-8xl block mb-6 px-12 pt-6">🏆</span>
          <h1 className="text-4xl font-black uppercase mb-4">Quiz Finished!</h1>
          <p className="font-bold text-xl mb-8">
            You scored <span className="underline decoration-4 decoration-neo-yellow">{score} out of {quizBank.length}</span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/progress">
              <button className="card-neo w-full py-4 text-white bg-neo-blue border-4 border-black font-black uppercase hover:bg-blue-400 text-sm">View Progress</button>
            </Link>
            <button onClick={() => window.location.reload()} className="btn-neo py-4 w-full text-black text-sm uppercase font-black">Retake Quiz ↺</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizBank[currentQuestion];

  if (!currentQ) {
    return (
      <div className="p-8 text-center mt-20">
        <h2 className="text-2xl font-black uppercase">No Questions Found in Database</h2>
        <Link to="/dashboard/topic" className="btn-neo mt-4 inline-block">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto mt-12 pb-20">
      <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">{chapter} Quiz</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-bold text-gray-500 uppercase text-xs">{subject}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="font-bold text-neo-pink text-xs uppercase">Question {currentQuestion + 1} of {quizBank.length}</span>
          </div>
        </div>
        {/* Timer Circle */}
        <div className={`w-16 h-16 border-4 border-black flex items-center justify-center font-black text-xl shadow-neo transition-colors ${timeLeft < 10 ? 'bg-red-400 animate-pulse' : 'bg-neo-yellow'}`}>
          {timeLeft}s
        </div>
      </div>

      <div className="card-neo p-10 relative">
        <span className="absolute -top-6 -left-6 w-12 h-12 bg-black text-white font-black text-2xl flex items-center justify-center rounded-full border-4 border-white shadow-[0_0_0_4px_#000]">
          ?
        </span>
        <h2 className="text-2xl font-bold mb-10 leading-snug">{currentQ.q}</h2>

        <div className="space-y-4">
          {currentQ.options.map((opt, i) => {
            let statusClass = "bg-white";
            if (showFeedback) {
              if (i === currentQ.ans) statusClass = "bg-green-400 text-white border-green-600";
              else if (i === selectedIdx) statusClass = "bg-red-400 text-white border-red-600";
              else statusClass = "opacity-50 transition-opacity duration-300";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={isLocked}
                className={`card-neo w-full text-left p-6 font-bold text-lg transition-all ${statusClass} ${!isLocked && 'hover:bg-gray-100 hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-block border-2 border-black w-8 h-8 text-center leading-7 mr-4 font-black ${showFeedback && i === currentQ.ans ? 'bg-white text-black' : 'bg-neo-blue'}`}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    {opt}
                  </div>
                  {showFeedback && i === currentQ.ans && <span>✔️</span>}
                  {showFeedback && i === selectedIdx && i !== currentQ.ans && <span>❌</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex gap-2">
        {quizBank.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-3 border-2 border-black ${i < currentQuestion ? 'bg-neo-pink' : i === currentQuestion ? 'bg-neo-yellow animate-pulse' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
