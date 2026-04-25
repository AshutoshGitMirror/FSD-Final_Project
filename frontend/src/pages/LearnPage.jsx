import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../utils/auth';

const LearnPage = () => {
  const { subject, chapter } = useParams();
  const user = getUser();
  const std = user?.std || 10;
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! Let's learn about ${chapter} in ${subject}. What do you want to know?` }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [images, setImages] = useState([]);
  const [extraLinks, setExtraLinks] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, images, extraLinks]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    
    // Background query for images from python backend
    fetch(`http://localhost:8080/imglinks?query=${encodeURIComponent(`${subject} ${chapter} ${currentInput}`)}`)
      .then(res => res.json())
      .then(data => { if(data.images) setImages(data.images); })
      .catch(console.error);

    // If external links toggle is ON
    if (showLinks) {
       fetch(`http://localhost:8080/ytlinks?std=${std}&query=${encodeURIComponent(currentInput)}`)
        .then(res => res.json())
        .then(data => { if(data.videos) setExtraLinks(prev => [...prev, ...data.videos.map(v => ({ type: 'yt', url: v }))]); });
    }

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput, isThinking, subject, chapter })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || data.error }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to Gemini API.' }]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] p-8 gap-8">
      {/* Visual / Links Sidebar */}
      <div className="w-1/3 flex flex-col gap-6 overflow-y-auto pr-4 hidden lg:flex">
        <h2 className="text-2xl font-black uppercase bg-neo-pink text-white px-4 py-2 border-4 border-black inline-block">Visuals & Links</h2>
        <div className="space-y-4">
          {images.map((img, i) => (
             <img key={i} src={img} alt="concept visual" className="card-neo w-full object-cover max-h-48" onError={(e) => e.target.style.display='none'} />
          ))}
          {extraLinks.map((link, i) => (
             <a key={i} href={link.url} target="_blank" rel="noreferrer" className="block card-neo p-4 font-bold text-sm bg-neo-blue text-black hover:underline break-words">
                🎬 Watch Related Video
             </a>
          ))}
          {images.length === 0 && extraLinks.length === 0 && (
             <div className="card-neo bg-gray-100 p-6 text-center font-bold text-gray-500">Ask a question to load resources!</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 card-neo bg-white flex flex-col p-6">
        <div className="border-b-4 border-black pb-4 mb-4 flex justify-between items-center bg-neo-yellow p-4 transform rotate-1 rounded-sm shadow-neo">
          <div>
             <h1 className="text-2xl font-black uppercase tracking-tight">{chapter}</h1>
             <p className="font-bold text-sm">{subject} • Session Active</p>
          </div>
          <span className="text-4xl text-white drop-shadow-[2px_2px_0px_#000]">🤖</span>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 border-4 border-black font-medium leading-relaxed ${msg.role === 'user' ? 'bg-neo-blue shadow-[4px_4px_0_0_#000]' : 'bg-gray-100 shadow-[4px_4px_0_0_#000] rounded-tl-none font-mono text-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Custom Input Box */}
        <div className="mt-6 border-4 border-black p-4 bg-neo-bg flex flex-col gap-4">
           {/* Toggles */}
           <div className="flex gap-4 border-b-2 border-black pb-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" className="w-5 h-5 accent-neo-pink border-2 border-black" checked={isThinking} onChange={e => setIsThinking(e.target.checked)} />
                 🧠 Deep Thinking Mode
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" className="w-5 h-5 accent-neo-blue border-2 border-black" checked={showLinks} onChange={e => setShowLinks(e.target.checked)} />
                 🔗 Fetch YT/Shaalaa Links
              </label>
           </div>
           
           <div className="flex gap-2">
             <button className="bg-red-200 border-2 border-black p-3 hover:bg-red-300 font-bold" title="Speech to text (Mocked)">🎤</button>
             <input 
               type="text" 
               className="flex-1 input-neo border-2 focus:ring-0" 
               placeholder="Type your question..." 
               value={input}
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && handleSend()}
             />
             <button className="btn-neo px-6" onClick={handleSend}>SEND 🚀</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
