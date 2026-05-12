import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { backendUrl } from '../config/api';

const SUBJECT_COLORS = ['bg-neo-yellow', 'bg-neo-pink text-white', 'bg-neo-blue', 'bg-gray-800 text-white'];

const TopicPage = () => {
  const [curriculum, setCurriculum] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const user = getUser();
  const std = user?.std || 10;
  const board = user?.board || 'CBSE';

  useEffect(() => {
    fetch(backendUrl(`/api/curriculum?std=${std}&board=${board}`))
      .then(res => res.json())
      .then(data => {
        setCurriculum(data);
        // Auto-select first subject by default
        if (data.length > 0) setSelectedSubject(data[0].subjectName);
      })
      .catch(err => console.error(err));
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
      ) : (
        <div className="card-neo bg-neo-yellow p-10 text-center font-black text-xl uppercase border-dashed">
          Loading curriculum...
        </div>
      )}
    </div>
  );
};

export default TopicPage;
