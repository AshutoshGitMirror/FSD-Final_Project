import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { backendUrl } from '../config/api';
import PdfViewer from '../components/PdfViewer';

const SUBJECT_COLORS = ['bg-neo-yellow', 'bg-neo-pink text-white', 'bg-neo-blue', 'bg-gray-800 text-white'];

const TopicPage = () => {
  const [curriculum, setCurriculum] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const user = getUser();
  const std = user?.std || 10;
  const board = user?.board || 'CBSE';

  const handleOpenPdf = async (chapterName) => {
    setPdfLoading(true);
    try {
      const res = await fetch(backendUrl(`/api/pdf?std=${std}&subject=${encodeURIComponent(selectedSubject)}&chapter=${encodeURIComponent(chapterName)}`));
      if (!res.ok) throw new Error('PDF not available');
      const data = await res.json();
      setPdfInfo(data);
      setShowPdf(true);
    } catch (err) {
      setPdfInfo({ error: err.message, title: chapterName });
      setShowPdf(true);
    }
    setPdfLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(backendUrl(`/api/curriculum?std=${std}&board=${board}`), { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCurriculum(data);
        if (data.length > 0) setSelectedSubject(data[0].subjectName);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [std, board]);

  const activeSubject = curriculum.find(s => s.subjectName === selectedSubject);

  return (
    <div className="p-8 pb-20">
      <h1 className="text-4xl font-black uppercase mb-2 tracking-tight">Choose Subject</h1>
      <p className="font-bold text-gray-600 mb-8">Std {std} · {board}</p>

      {/* Subject Selector Buttons */}
      <div className="flex flex-wrap gap-4 mb-12 border-b-4 border-black pb-8">
        {curriculum.map((subject, idx) => {
          const isActive = subject.subjectName === selectedSubject;
          const colorClass = SUBJECT_COLORS[idx % SUBJECT_COLORS.length];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedSubject(subject.subjectName)}
              className={`border-4 border-black font-black text-xl px-8 py-4 transition-all active:translate-y-1 active:translate-x-1 ${
                isActive
                  ? `${colorClass} shadow-[6px_6px_0_0_#000] -translate-y-1`
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {subject.subjectName}
            </button>
          );
        })}
      </div>

      {/* Chapter Grid of Selected Subject */}
      {activeSubject ? (
        <div>
          <h2 className="text-3xl font-black uppercase mb-8 inline-block border-b-8 border-black pb-2">
            {activeSubject.subjectName} — Chapters
            <span className="ml-4 text-base font-bold text-gray-500">({activeSubject.chapters.length} total)</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSubject.chapters.map((chapter, cIdx) => (
              <div
                key={cIdx}
                className="card-neo bg-white flex flex-col justify-between hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000] transition-all"
              >
                <div className="p-6">
                  <div className="w-10 h-10 border-4 border-black bg-neo-yellow font-black text-lg flex items-center justify-center mb-4 shadow-[2px_2px_0_0_#000]">
                    {cIdx + 1}
                  </div>
                  <h3 className="font-black text-xl mb-2 leading-snug">{chapter.chapterName}</h3>
                  <p className="font-medium text-gray-500 text-sm">{chapter.description}</p>
                </div>
                <div className="border-t-4 border-black flex">
                  <button
                    onClick={() => handleOpenPdf(chapter.chapterName)}
                    disabled={pdfLoading}
                    className="flex-1 text-center font-black uppercase py-4 text-sm hover:bg-green-200 border-r-4 border-black transition-colors disabled:opacity-50"
                    title="Open NCERT Textbook PDF"
                  >
                    📄 PDF
                  </button>
                  <Link
                    to={`/dashboard/learn/${encodeURIComponent(activeSubject.subjectName)}/${encodeURIComponent(chapter.chapterName)}`}
                    className="flex-1 text-center font-black uppercase py-4 text-sm hover:bg-neo-blue border-r-4 border-black transition-colors"
                  >
                    🤖 AI Learn
                  </Link>
                  <Link
                    to={`/dashboard/quiz/${encodeURIComponent(activeSubject.subjectName)}/${encodeURIComponent(chapter.chapterName)}`}
                    className="flex-1 text-center font-black uppercase py-4 text-sm hover:bg-neo-pink hover:text-white transition-colors"
                  >
                    ⚡ Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : loading ? (
        <div className="card-neo bg-neo-yellow p-10 text-center font-black text-xl uppercase border-dashed">
          Loading curriculum...
        </div>
      ) : error ? (
        <div className="card-neo bg-red-400 p-10 text-center font-black text-xl uppercase text-white">
          Error: {error}
        </div>
      ) : (
        <div className="card-neo bg-neo-yellow p-10 text-center font-black text-xl uppercase border-dashed">
          No curriculum found for Std {std} · {board}
        </div>
      )}

      {showPdf && pdfInfo && (
        pdfInfo.error ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="card-neo bg-white max-w-lg w-full p-8 text-center">
              <span className="text-5xl block mb-4">📄</span>
              <h3 className="font-black text-xl uppercase mb-2">PDF Not Available</h3>
              <p className="font-bold text-gray-600 mb-4">No NCERT PDF mapped for this chapter yet.</p>
              <button onClick={() => setShowPdf(false)} className="btn-neo px-6 py-3">Close</button>
            </div>
          </div>
        ) : (
          <PdfViewer
            pdfUrl={backendUrl(`/api/pdf/proxy?url=${encodeURIComponent(pdfInfo.ncertUrl)}`)}
            title={`NCERT Std ${std} ${pdfInfo.subjectName} - ${pdfInfo.chapterName}`}
            onClose={() => setShowPdf(false)}
          />
        )
      )}
    </div>
  );
};

export default TopicPage;
