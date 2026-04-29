import { useState, useEffect, useRef } from 'react';
import { authFetch, getUser } from '../utils/auth';
import { backendUrl } from '../config/api';

const FeynmanPage = () => {
  const user = getUser();
  const [concept, setConcept] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStart = () => {
    if (!concept.trim()) return;
    setIsStarted(true);
    setMessages([{
      role: 'assistant',
      content: `Hi! I'm a student in Grade ${user?.std || '10'} too. I want to learn about "${concept}". Can you explain it to me simply?`
    }]);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await authFetch(backendUrl('/api/feynman/chat'), {
        method: 'POST',
        body: JSON.stringify({
          concept,
          messages: newMessages
        })
      });
      const data = await res.json();
      
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([...newMessages, { role: 'assistant', content: "I'm a bit confused, my brain stopped working. Can you try explaining that again?" }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">💡 Feynman Sandbox</h1>
        <p className="font-bold text-gray-500 text-sm">The ultimate test of mastery: Teach it to a peer.</p>
      </div>

      {!isStarted ? (
        <div className="card-neo bg-white p-10 mt-10 text-center max-w-2xl mx-auto">
          <span className="text-7xl block mb-6">🧑‍🏫</span>
          <h2 className="text-2xl font-black uppercase mb-4">What do you want to teach?</h2>
          <p className="font-bold text-gray-600 mb-8">
            Enter a concept. The AI will act as a curious classmate in Grade {user?.std || '10'} and ask you questions until you explain it perfectly.
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g. Photosynthesis, Gravity, Fractions..."
              className="flex-1 border-4 border-black p-4 font-bold text-lg outline-none focus:bg-yellow-50"
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <button
              onClick={handleStart}
              className="btn-neo bg-neo-pink text-white px-8 py-4 font-black uppercase text-lg hover:bg-pink-600"
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="card-neo bg-white flex-1 flex flex-col overflow-hidden border-4 border-black">
          {/* Chat Header */}
          <div className="bg-neo-yellow border-b-4 border-black p-4 flex justify-between items-center shrink-0">
            <div>
              <p className="font-black uppercase text-xs">Teaching Topic:</p>
              <h3 className="font-black text-xl">{concept}</h3>
            </div>
            <button 
              onClick={() => {setIsStarted(false); setConcept(''); setMessages([]);}}
              className="border-2 border-black bg-white px-4 py-2 font-black text-xs uppercase hover:bg-gray-100"
            >
              Change Topic
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neo-bg">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-orange-300 flex items-center justify-center text-xl mr-3 shrink-0">
                    👦
                  </div>
                )}
                
                <div className={`max-w-[80%] p-4 border-4 border-black font-bold text-lg ${
                  msg.role === 'user' ? 'bg-neo-blue text-black' : 'bg-white text-black'
                } ${msg.role === 'user' ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' : 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'}`}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-pink flex items-center justify-center text-white font-black text-xl ml-3 shrink-0">
                    You
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-10 h-10 rounded-full border-2 border-black bg-orange-300 flex items-center justify-center text-xl mr-3 shrink-0">👦</div>
                <div className="p-4 border-4 border-black bg-white rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-4 border-t-4 border-black bg-white flex gap-4 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Explain it simply..."
              className="flex-1 border-4 border-black p-4 font-bold text-lg outline-none focus:bg-blue-50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-neo bg-green-400 text-black px-8 py-4 font-black uppercase text-lg hover:bg-green-500 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeynmanPage;
