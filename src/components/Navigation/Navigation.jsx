import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Notebook from '../Notebook/Notebook';
import './Navigation.css';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'featured', label: 'Featured' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Use the same section list as the buttons, including the last section
      // when the page cannot scroll far enough to bring it to the top.
      const sections = navItems.map(item => document.getElementById(item.id));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const activationPoint = Math.max(0, Math.min(sectionTop - 100, maxScroll));
        if (window.scrollY >= activationPoint - 1) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    const initialFrame = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock page scroll behind the open mobile menu; close it on Escape or when
  // the viewport grows past the mobile breakpoint
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const mql = window.matchMedia('(max-width: 900px)');
    const close = () => setMobileMenuOpen(false);
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const onChange = (e) => { if (!e.matches) close(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    mql.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onChange);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    // Wait a frame so the menu's scroll lock is released before scrolling
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <>
      <Motion.nav
        className={`navigation ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="nav-container">
          <Motion.div
            className="nav-logo"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection('about')}
          >
            <span className="logo-text">Project</span>
            <span className="logo-dot"> </span>
            <span className="logo-text">Portfolio</span>
          </Motion.div>

          <div className="nav-right">
            <div className="nav-items">
              {navItems.map((item, index) => (
                <Motion.button
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="nav-item-text">{item.label}</span>
                  {activeSection === item.id && (
                    <Motion.div
                      className="nav-item-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Motion.button>
              ))}
              <Motion.a
                href="https://blog.krishna-bhatt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.4 }}
              >
                Weblog
              </Motion.a>
            </div>

            <a
              href="#notebook"
              role="button"
              className="nav-resume-btn"
              onClick={(e) => {
                e.preventDefault();
                setNotebookOpen(true);
              }}
            >
              Notebook
            </a>
          </div>

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </Motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item, index) => (
                <Motion.button
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                </Motion.button>
              ))}
              <Motion.a
                href="https://blog.krishna-bhatt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-item"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <span className="mobile-nav-number">0{navItems.length + 1}</span>
                <span className="mobile-nav-text">Weblog</span>
              </Motion.a>
              <a
                href="#notebook"
                role="button"
                className="mobile-resume-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setNotebookOpen(true);
                }}
              >
                Notebook
              </a>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <Notebook isOpen={notebookOpen} onClose={() => setNotebookOpen(false)} />
    </>
  );
};

export default Navigation;
