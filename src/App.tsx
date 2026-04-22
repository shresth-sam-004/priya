import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Links from './pages/Links';
import Uses from './pages/Uses';
import Achievements from './pages/Achievements';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      {/* Route mapping */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/links" element={<Links />} />
        <Route path="/uses" element={<Uses />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </>
  );
}

export default App;
