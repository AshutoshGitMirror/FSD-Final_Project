import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../config/api';

const SignupPage = () => {
  const [std, setStd] = useState(7);
  const [board, setBoard] = useState('CBSE');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, std, board })
      });
      
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to sign up');
      } else {
        setError('');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Server error connecting to backend.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-neo-bg">
      <nav className="flex justify-between items-center p-6 border-b-4 border-black bg-white">
        <div className="font-black text-2xl tracking-tighter">AI TUTOR</div>
        <div className="space-x-6 font-bold text-sm">
          <Link to="/login" className="hover:underline">LOGIN</Link>
          <Link to="/signup" className="hover:underline text-neo-pink">SIGNUP</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row p-8 lg:p-16 gap-12 relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full border-4 border-black -z-0"></div>

        <div className="flex-1 z-10 flex flex-col justify-center max-w-lg mx-auto lg:mx-0">
          <h1 className="text-5xl lg:text-7xl font-black uppercase leading-tight mb-6">
            Unlock your <br/>
            <span className="bg-neo-yellow px-2 inline-block -rotate-1 border-4 border-black">
              SUPERPOWER!
            </span>
          </h1>
          <p className="text-xl font-medium mb-10 text-gray-800">
            The notebook that gets you. Join thousands of students making learning a playful adventure.
          </p>

          <div className="card-neo bg-gray-200 p-6 mb-8 transform -rotate-1">
            <h3 className="font-black flex items-center gap-3 text-lg mb-2">
              <span className="bg-neo-blue w-8 h-8 flex items-center justify-center border-2 border-black text-white">🏆</span> 
              Top Board Support
            </h3>
            <p className="font-medium text-sm">Personalized tracks for CBSE, ICSE, and more. Your syllabus, supercharged.</p>
          </div>
          
          <div className="flex items-center gap-4 font-black">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-pink"></div>
              <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-yellow"></div>
              <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-blue"></div>
            </div>
            <span>+ 5,000 ADVENTURERS</span>
          </div>
        </div>

        <div className="flex-1 z-10">
          <form className="max-w-xl mx-auto space-y-6" onSubmit={handleSignup}>
            
            {error && (
              <div className="card-neo bg-red-400 p-4 font-bold text-white mb-4">
                {error}
              </div>
            )}

            {/* Step 1: Info */}
            <div className="card-neo p-8 bg-white space-y-6 relative hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <span className="bg-neo-pink text-white w-8 h-8 flex items-center justify-center border-2 border-black">1</span> 
                Who are you?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black text-xs uppercase mb-2">Full Name</label>
                  <input type="text" placeholder="Enter your name" className="input-neo w-full" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div>
                  <label className="block font-black text-xs uppercase mb-2">Email Address</label>
                  <input type="email" placeholder="student@example.com" className="input-neo w-full" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              
              <div>
                <label className="block font-black text-xs uppercase mb-2">Password</label>
                <input type="password" placeholder="Create a secret code" className="input-neo w-full" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>

            {/* Step 2: Class */}
            <div className="card-neo p-8 bg-white relative hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                <span className="bg-neo-blue text-white w-8 h-8 flex items-center justify-center border-2 border-black">2</span> 
                Pick your Class
              </h2>
              
              <div className="grid grid-cols-5 gap-3">
                {[1,2,3,4,5,6,7,8,9,10].map(s => (
                  <button 
                    key={s}
                    type="button"
                    onClick={() => setStd(s)}
                    className={`border-4 border-black font-black text-2xl py-3 flex flex-col items-center justify-center transition-transform active:translate-y-1 active:translate-x-1 ${std === s ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                  >
                    <span>{s}</span>
                    <span className="text-[0.5rem] mt-1 font-bold tracking-widest text-gray-400">GRADE</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Board */}
            <div className="card-neo p-8 bg-white relative hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                <span className="bg-neo-yellow text-white w-8 h-8 flex items-center justify-center border-2 border-black">3</span> 
                Choose your Board
              </h2>
              
              <div className="flex flex-wrap gap-4">
                {['CBSE', 'ICSE', 'IB', 'State Board'].map(b => (
                  <button 
                    key={b}
                    type="button"
                    onClick={() => setBoard(b)}
                    className={`border-4 border-black font-black px-6 py-3 transition-transform active:translate-y-1 active:translate-x-1 ${board === b ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center mt-8">
               <button type="submit" className="btn-neo py-6 px-12 text-2xl flex-1 active:shadow-[1px_1px_0_0_#000]">
                 JOIN THE ADVENTURE 🚀
               </button>
               <p className="text-xs font-bold uppercase tracking-wider w-1/3 leading-relaxed">
                 By joining, you agree to our <a href="#" className="underline decoration-2">Quest Rules</a>.
               </p>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
