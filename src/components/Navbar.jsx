import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// EN listed first as default, then remaining languages in alphabetical order
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'bg', label: 'Български' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
];

export default function Navbar({ theme, toggleTheme }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setLangOpen(false);
  };

  // Normalise 'en-US' → 'en' etc.
  const resolvedLang = (i18n.language || 'en').split('-')[0];
  const currentLang = LANGUAGES.find(l => l.code === resolvedLang) || LANGUAGES[0];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            Influencing<span>.</span>Digital
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
              {t('nav.home')}
            </Link>
            <Link to="/purpose" className={`nav-link ${isActive('/purpose') ? 'active' : ''}`}>
              {t('nav.purpose')}
            </Link>
            <Link to="/brands" className={`nav-link ${isActive('/brands') ? 'active' : ''}`}>
              {t('nav.brands')}
            </Link>
            <Link to="/partners" className={`nav-link ${isActive('/partners') ? 'active' : ''}`}>
              {t('nav.partners')}
            </Link>

            {/* Dropdown */}
            <div className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
              <button
                className="nav-dropdown-toggle"
                onClick={() => setDropdownOpen(o => !o)}
                aria-expanded={dropdownOpen}
              >
                {t('nav.whyUs')}
                <ChevronDown size={13} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/services" className="nav-dropdown-item">{t('nav.services')}</Link>
                    <Link to="/affiliation" className="nav-dropdown-item">{t('nav.affiliation')}</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              {t('nav.contact')}
            </Link>
          </div>

          {/* Controls */}
          <div className="nav-controls">
            {/* Language */}
            <div className="lang-selector" ref={langRef}>
              <button className="lang-btn" onClick={() => setLangOpen(o => !o)} aria-label="Language">
                <Globe size={13} />
                {currentLang.code.toUpperCase()}
                <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="lang-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        className={`lang-option ${resolvedLang === lang.code ? 'active' : ''}`}
                        onClick={() => changeLang(lang.code)}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label={t('common.menu')}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          >
            <Link to="/" className="mobile-nav-link">{t('nav.home')}</Link>
            <Link to="/purpose" className="mobile-nav-link">{t('nav.purpose')}</Link>
            <Link to="/brands" className="mobile-nav-link">{t('nav.brands')}</Link>
            <Link to="/partners" className="mobile-nav-link">{t('nav.partners')}</Link>
            <div>
              <span className="mobile-nav-link" style={{ cursor: 'default', color: 'var(--text-muted)' }}>
                {t('nav.whyUs')}
              </span>
              <Link to="/services" className="mobile-nav-sub">{t('nav.services')}</Link>
              <Link to="/affiliation" className="mobile-nav-sub">{t('nav.affiliation')}</Link>
            </div>
            <Link to="/contact" className="mobile-nav-link">{t('nav.contact')}</Link>

            <div className="mobile-controls">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`mobile-lang-option ${resolvedLang === lang.code ? 'active' : ''}`}
                  onClick={() => changeLang(lang.code)}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
              <button
                className="mobile-lang-option"
                onClick={toggleTheme}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
