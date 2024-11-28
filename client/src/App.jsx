import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/loginPage';
import HomepageSA from './Components/homepageSA';
import HomepageAD from './Components/homepageAD';
import HomepageHQ from './Components/homepageHQ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sales-associate" element={<HomepageSA />} />
        <Route path="/admin" element={<HomepageAD />} />
        <Route path="/headquarters" element={<HomepageHQ />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;