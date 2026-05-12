import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardExtended from './pages/DashboardExtended';
import EthicsPage from './pages/EthicsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ethics" element={<EthicsPage />} />
        <Route path="/dashboard/*" element={<DashboardExtended />} />
      </Routes>
    </Router>
  );
}

export default App;
