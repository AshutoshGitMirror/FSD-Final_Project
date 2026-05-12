import { useEffect, useState } from 'react';
import { authFetch } from '../utils/auth';
import { backendUrl } from '../config/api';

const SavedLinksPage = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    authFetch(backendUrl('/api/links'))
      .then(res => res.json())
      .then(data => setLinks(Array.isArray(data) ? data : []))
      .catch(() => setLinks([]));
  }, []);

  return (
    <div className="p-8 pb-20 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black uppercase mb-8 border-b-8 border-black pb-4 inline-block bg-neo-pink text-white px-4">Saved YT Links</h1>
      <p className="font-bold text-gray-700 mb-8 max-w-xl">
        All the YouTube links that our AI fetched for you are stored here for your quick revision!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {links.length === 0 && (
          <div className="card-neo border-dashed p-10 col-span-2 text-center text-gray-400 font-bold uppercase">
            No Links Saved Yet. Talk to the AI to fetch and save some!
          </div>
        )}
        {links.map((link, i) => (
          <div key={link._id || i} className="card-neo bg-white flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000] p-0 overflow-hidden">
            <div className="p-6">
              <span className="inline-block border-2 border-black font-black text-xs uppercase px-2 py-1 mb-4 bg-red-500 text-white">
                YouTube
              </span>
              <h3 className="font-black text-xl mb-2">{link.title}</h3>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="bg-neo-yellow border-t-4 border-black p-4 font-black uppercase flex justify-between items-center group-hover:bg-yellow-300 transition-colors"
            >
              <span>Watch Now</span>
              <span className="text-xl">▶️</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLinksPage;
