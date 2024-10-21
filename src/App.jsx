import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Components/loginPage';
import HomepageSA from './Components/homepageSA';
import HomepageAD from './Components/homepageAD';
import HomepageHQ from './Components/homepageHQ';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/sales-associate" element={<HomepageSA onLogout={handleLogout} />} />
        <Route path="/admin" element={<HomepageAD onLogout={handleLogout} />} />
        <Route path="/headquarters" element={<HomepageHQ onLogout={handleLogout} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;