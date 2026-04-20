import { Routes, Route } from 'react-router-dom';
import TopNav from './TopNav';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Links from './pages/Links';
import Uses from './pages/Uses';

function App() {
  return (
    <>
      <TopNav />
      {/* Route mapping */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/links" element={<Links />} />
        <Route path="/uses" element={<Uses />} />
      </Routes>
    </>
  );
}

export default App;
