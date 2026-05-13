import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Purpose from './pages/Purpose';
import Brands from './pages/Brands';
import Partners from './pages/Partners';
import Services from './pages/Services';
import Affiliation from './pages/Affiliation';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ZdravRazum from './pages/brands/ZdravRazum';
import BulgariaWatch from './pages/brands/BulgariaWatch';
import ForwardBG from './pages/brands/ForwardBG';
import TraditionFuture from './pages/brands/TraditionFuture';
import PeopleOfBulgaria from './pages/brands/PeopleOfBulgaria';

// Page transition wrapper
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppInner() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    // Honour explicit user choice, otherwise follow OS preference
    const stored = localStorage.getItem('id-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('id-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <>
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/purpose" element={<Purpose />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/services" element={<Services />} />
          <Route path="/affiliation" element={<Affiliation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/brands/zdrav-razum" element={<ZdravRazum />} />
          <Route path="/brands/bulgaria-watch" element={<BulgariaWatch />} />
          <Route path="/brands/forward-bg" element={<ForwardBG />} />
          <Route path="/brands/tradition-future" element={<TraditionFuture />} />
          <Route path="/brands/people-of-bulgaria" element={<PeopleOfBulgaria />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
