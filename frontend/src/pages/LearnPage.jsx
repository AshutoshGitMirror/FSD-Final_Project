import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { backendUrl, linksUrl } from '../config/api';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you

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
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, images, extraLinks]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage, { role: 'ai', text: 'Thinking…', isPlaceholder: true }]);
    const currentInput = input;
    setInput('');
    
    // Background query for images from python backend
    fetch(linksUrl(`/imglinks?query=${encodeURIComponent(`${subject} ${chapter} ${currentInput}`)}`))
      .then(res => res.json())
      .then(data => { if(data.images) setImages(data.images); })
      .catch(console.error);

    // If external links toggle is ON
    if (showLinks) {
       fetch(linksUrl(`/ytlinks?std=${std}&query=${encodeURIComponent(currentInput)}`))
        .then(res => res.json())
        .then(data => { if(data.videos) setExtraLinks(prev => [...prev, ...data.videos.map(v => ({ type: 'yt', url: v }))]); })
        .catch(console.error);

       fetch(linksUrl(`/shaalaalinks?std=${std}&query=${encodeURIComponent(currentInput)}`))
        .then(res => res.json())
        .then(data => { if(data.links) setExtraLinks(prev => [...prev, ...data.links.map(l => ({ type: 'shaalaa', url: l }))]); })
        .catch(console.error);
    }

    const updateLatestAiMessage = (text, thoughts) => {
      setMessages(prev => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].role === 'ai') {
            next[i] = {
              ...next[i],
              text,
              thoughts: thoughts ?? next[i].thoughts,
              isPlaceholder: false
            };
            break;
          }
        }
        return next;
      });
    };

    try {
      const response = await fetch(backendUrl('/api/chat'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Chat-Stream': '1'
        },
        body: JSON.stringify({ prompt: currentInput, isThinking, subject, chapter })
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        if (contentType.includes('application/json')) {
          const data = await response.json();
          updateLatestAiMessage(data.error || 'Error connecting to Gemini API.');
        } else {
          const text = await response.text();
          updateLatestAiMessage(text || 'Error connecting to Gemini API.');
        }
        return;
      }

      if (contentType.includes('application/json')) {
        const data = await response.json();
        updateLatestAiMessage(data.reply || data.error || '', data.thoughts);
        return;
      }

      if (!response.body) {
        const text = await response.text();
        updateLatestAiMessage(text || 'No response from Gemini API.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        streamedText += decoder.decode(value, { stream: true });
        updateLatestAiMessage(streamedText);
      }

      streamedText += decoder.decode();
      if (!streamedText.trim()) {
        updateLatestAiMessage('No response from Gemini API.');
      }
    } catch {
      updateLatestAiMessage('Error connecting to Gemini API.');
    } finally {
      setIsLoading(false);
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
             <a key={i} href={link.url} target="_blank" rel="noreferrer" className={`block card-neo p-4 font-bold text-sm text-black hover:underline break-words ${link.type === 'yt' ? 'bg-neo-blue' : 'bg-neo-yellow'}`}>
                {link.type === 'yt' ? '🎬 Watch Related Video' : '📚 Read Shaalaa Material'}
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
              <div className={`max-w-[80%] p-4 border-4 border-black font-medium leading-relaxed ${msg.role === 'user' ? 'bg-neo-blue shadow-[4px_4px_0_0_#000]' : 'bg-gray-100 shadow-[4px_4px_0_0_#000] rounded-tl-none flex flex-col gap-3'}`}>
                {msg.thoughts && (
                  <div className="bg-gray-200 border-l-4 border-gray-400 p-3 text-xs font-mono text-gray-600 rounded-sm">
                    <p className="font-black uppercase mb-1 flex items-center gap-1"><span>🧠</span> Thought Process</p>
                    <div className="opacity-80">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{msg.thoughts}</ReactMarkdown>
                    </div>
                  </div>
                )}
                <div className="prose prose-p:my-1 prose-h1:text-xl prose-h2:text-lg prose-ul:my-1 prose-li:my-0 prose-pre:bg-gray-800 prose-pre:text-white max-w-none">
                  {msg.role === 'ai' ? (
                    msg.isPlaceholder ? (
                      <span className="italic opacity-70">{msg.text}</span>
                    ) : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    )
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-4 border-4 border-black bg-gray-100 shadow-[4px_4px_0_0_#000] rounded-tl-none font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Custom Input Box */}
        <div className="mt-6 border-4 border-black p-4 bg-neo-bg flex flex-col gap-4">
           {/* Toggles */}
           <div className="flex gap-4 border-b-2 border-black pb-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" className="w-5 h-5 accent-neo-pink border-2 border-black" checked={isThinking} onChange={e => setIsThinking(e.target.checked)} disabled={isLoading} />
                 🧠 Deep Thinking Mode
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                 <input type="checkbox" className="w-5 h-5 accent-neo-blue border-2 border-black" checked={showLinks} onChange={e => setShowLinks(e.target.checked)} disabled={isLoading} />
                 🔗 Fetch YT/Shaalaa Links
              </label>
           </div>
           
           <div className="flex gap-2">
             <button className="bg-red-200 border-2 border-black p-3 hover:bg-red-300 font-bold disabled:opacity-50" title="Speech to text (Mocked)" disabled={isLoading}>🎤</button>
             <input 
               type="text" 
               className="flex-1 input-neo border-2 focus:ring-0 disabled:opacity-50 disabled:bg-gray-100" 
               placeholder={isLoading ? "Waiting for AI..." : "Type your question..."}
               value={input}
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && handleSend()}
               disabled={isLoading}
             />
             <button className="btn-neo px-6 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSend} disabled={isLoading || !input.trim()}>
                SEND 🚀
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
