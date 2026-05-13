import { useState } from 'react';

const PdfViewer = ({ directUrl, title, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useIframe, setUseIframe] = useState(true);

  if (error && !useIframe) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
        <div className="card-bub-solid bg-white max-w-lg w-full p-8 text-center" onClick={e => e.stopPropagation()}>
          <span className="text-5xl block mb-4">📄</span>
          <h3 className="font-black text-xl uppercase mb-2">PDF Not Available in Viewer</h3>
          <p className="font-bold text-gray-600 mb-4">NCERT blocks embedded viewers. Open directly in a new tab instead!</p>
          <a href={directUrl} target="_blank" rel="noreferrer" className="btn-bub-primary px-6 py-3 inline-block mb-3">
            📖 Open in New Tab
          </a>
          <button onClick={onClose} className="btn-bub-ghost px-6 py-3">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60" onClick={onClose}>
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shrink-0 rounded-t-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <h3 className="font-black text-lg truncate max-w-md">{title || 'NCERT Textbook'}</h3>
        </div>
        <div className="flex items-center gap-2">
          {directUrl && (
            <a
              href={directUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-bub-primary px-4 py-2 text-xs"
            >
              Open in New Tab
            </a>
          )}
          <button onClick={onClose} className="btn-bub-ghost px-3 py-2 text-xs">✕ Close</button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
        {loading && useIframe && (
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-white border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-lg">Loading PDF from NCERT...</p>
          </div>
        )}
        {useIframe && directUrl && (
          <iframe
            src={directUrl}
            className="w-full h-full rounded-xl shadow-lg"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError('NCERT blocks embedded viewing. Try opening in a new tab.'); setUseIframe(false); }}
            title={title || 'PDF Viewer'}
          />
        )}
        {!useIframe && (
          <div className="text-center text-white">
            <span className="text-6xl block mb-4">📖</span>
            <p className="text-xl font-bold mb-4">NCERT blocks embedded PDF viewing from cloud servers.</p>
            <a href={directUrl} target="_blank" rel="noreferrer" className="btn-bub-primary px-8 py-4 text-lg inline-block">
              📥 Open PDF in New Tab
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
