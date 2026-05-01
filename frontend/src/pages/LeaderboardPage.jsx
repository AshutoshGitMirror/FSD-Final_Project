import { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { backendUrl } from '../config/api';

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const user = getUser();
  const std = user?.std;
  const board = user?.board;

  useEffect(() => {
    const url = (std && board) 
      ? backendUrl(`/api/leaderboard?std=${std}&board=${board}`)
      : backendUrl('/api/leaderboard');

    fetch(url)
      .then(res => res.json())
      .then(data => setLeaders(data))
      .catch(() => setLeaders([]));
  }, [std, board]);

  return (
    <div className="p-8 pb-20 max-w-4xl mx-auto">
      <div className="text-center mb-12 relative">
        <span className="absolute -top-10 left-10 text-6xl transform -rotate-12 drop-shadow-[2px_2px_0px_#000]">👑</span>
        <span className="absolute top-0 right-10 text-4xl transform rotate-12">✨</span>
        <h1 className="text-5xl font-black uppercase inline-block border-8 border-black p-4 bg-neo-yellow shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          {std ? `Grade ${std} Leaderboard` : 'Global Leaderboard'}
        </h1>
        <p className="font-bold text-gray-700 mt-6 text-xl">Top Scholars — {board || 'Global'}</p>
      </div>

      <div className="space-y-4">
        {leaders.length === 0 && (
          <div className="card-neo border-dashed p-10 text-center text-gray-400 font-bold uppercase">
            No leaderboard data yet.
          </div>
        )}
        {leaders.map((entry, idx) => {
          const rank = idx + 1;
          let rankLabel = `#${rank}`;
          let cardBg = 'bg-white';
          let badgeBg = 'bg-white';
          let shadowClass = 'shadow-neo';

          if (rank === 1) {
            rankLabel = '🥇 1st';
            cardBg = 'bg-neo-pink text-white scale-[1.02] border-b-8 mb-6';
            badgeBg = 'bg-neo-yellow text-black';
            shadowClass = 'shadow-[8px_8px_0_0_#000]';
          } else if (rank === 2) {
            rankLabel = '🥈 2nd';
            cardBg = 'bg-neo-yellow border-b-8 mb-4';
            badgeBg = 'bg-white text-black';
          } else if (rank === 3) {
            rankLabel = '🥉 3rd';
            cardBg = 'bg-neo-blue border-b-8 mb-4';
            badgeBg = 'bg-white text-black';
          }

          return (
            <div key={entry._id || idx} className={`card-neo p-6 flex items-center justify-between transition-transform hover:-translate-y-1 ${cardBg} ${shadowClass}`}>
              <div className="flex items-center gap-6">
                <div className={`px-4 py-2 border-4 border-black font-black text-xl flex items-center justify-center ${badgeBg} shadow-[2px_2px_0_0_#000]`}>
                  {rankLabel}
                </div>
                <div>
                  <h2 className={`text-2xl font-black uppercase tracking-tight ${rank === 1 ? 'drop-shadow-[2px_2px_0px_#000]' : ''}`}>
                    {entry.userName}
                  </h2>
                  <p className="font-bold opacity-80 text-sm italic">
                    {entry.totalChaptersCompleted} Chapters Mastered
                  </p>
                </div>
              </div>
              <div className="text-right border-l-4 border-black pl-8 hidden sm:block bg-white text-black py-2 px-6 shadow-[4px_4px_0_0_#000]">
                <span className="block text-xs font-black uppercase text-gray-500">Overall Avg</span>
                <span className="text-4xl font-black">{entry.averageScore}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardPage;
