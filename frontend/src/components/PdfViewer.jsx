import { useState } from 'react';

const PdfViewer = ({ pdfUrl, title, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
        <div className="card-bub-solid bg-white max-w-lg w-full p-8 text-center" onClick={e => e.stopPropagation()}>
          <span className="text-5xl block mb-4">📄</span>
          <h3 className="font-black text-xl uppercase mb-2">Could Not Load PDF</h3>
          <p className="font-bold text-gray-600 mb-4">{error}</p>
          <button onClick={onClose} className="btn-bub-primary px-6 py-3">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60" onClick={onClose}>
      {/* Toolbar */}
      <div className="bg-white border-b-4 border-black p-4 flex items-center justify-between shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <h3 className="font-black text-lg truncate max-w-md">{title || 'NCERT Textbook'}</h3>
        </div>
        <div className="flex items-center gap-2">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-gray-200 px-3 py-1 font-bold text-sm hover:bg-gradient-to-r from-amber-400 to-orange-400 transition-colors"
            >
              Download
            </a>
          )}
          <button onClick={onClose} className="border border-gray-200 px-3 py-1 font-bold text-sm hover:bg-red-200 transition-colors">
            ✕ Close
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
        {loading && (
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-white border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-lg">Loading PDF...</p>
          </div>
        )}
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-lg "
            style={{ border: '4px solid black' }}
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError('Failed to load the PDF. The NCERT server may be unavailable.'); }}
            title={title || 'PDF Viewer'}
          />
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
