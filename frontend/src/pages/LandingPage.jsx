import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="flex justify-between items-center p-6 border-b-4 border-black bg-white">
        <div className="font-black text-2xl tracking-tighter">AI TUTOR</div>
        <div className="space-x-6 font-bold text-sm">
          <Link to="#" className="hover:underline">FEATURES</Link>
          <Link to="#" className="hover:underline">PRICING</Link>
          <Link to="/login" className="hover:underline">LOGIN</Link>
          <Link to="/signup">
            <button className="btn-neo px-4 py-2 text-xs">SIGNUP</button>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-neo-bg">
        <div className="max-w-4xl pt-12 pb-8">
          <h2 className="text-sm font-bold bg-neo-pink text-white inline-block px-3 py-1 border-2 border-black mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
            Grades 1-10 Specialists
          </h2>
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-6">
            LEARN LIKE A <br />
            <span className="bg-neo-yellow text-black border-4 border-black px-4 inline-block mt-2 transform -rotate-2">
              ROCKSTAR
            </span>{' '}
            WITH AI!
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-10 text-gray-800">
            Ditch the boring textbooks. Get a personalized AI tutor that understands exactly how YOU learn. From homework help to exam prep, we've got you.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/signup">
              <button className="btn-neo px-8 py-4 text-xl">START LEARNING</button>
            </Link>
            <Link to="/login">
              <button className="card-neo px-8 py-4 text-xl font-bold transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                LOG IN
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16 w-full px-4 pb-20">
          <div className="card-neo p-8 bg-gray-100 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-neo-blue border-2 border-black rounded-full flex items-center justify-center mb-4">
              <span className="text-xl">🤖</span>
            </div>
            <h3 className="text-2xl font-black mb-2 uppercase">AI Genius Tutor</h3>
            <p className="font-medium">
              Our AI isn't just smart - it's tailored to your school's curriculum. It explains complex math like a comic book and history like an epic movie.
            </p>
          </div>
          
          <div className="card-neo p-8 bg-neo-yellow flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mb-4">
              <span className="text-xl">⚡</span>
            </div>
            <h3 className="text-2xl font-black mb-2 uppercase">Instant Quizzes</h3>
            <p className="font-medium">
              Turn any lesson into a high-speed challenge. Earn points, beat your high score, and master your subjects fast.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t-4 border-black p-6 bg-white flex justify-between items-center text-sm font-bold">
        <div>© 2024 AI TUTOR LABS. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4 text-xl">
          <span>🔊</span>
          <span>🌍</span>
          <span>🛡️</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
