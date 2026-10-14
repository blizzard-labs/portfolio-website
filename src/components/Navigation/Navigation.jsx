import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Notebook from '../Notebook/Notebook';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'gallery', label: 'Gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setMobileMenuOpen(false);
    // Wait a frame so the menu's scroll lock is released before scrolling
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <>
      <motion.nav 
        className={`navigation ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection('about')}
          >
            <span className="logo-text">Project</span>
            <span className="logo-dot"> </span>
            <span className="logo-text">Portfolio</span>
          </motion.div>

          <div className="nav-right">
            <div className="nav-items">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="nav-item-text">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      className="nav-item-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <motion.a
                href="https://blog.krishna-bhatt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.4 }}
              >
                Weblog
              </motion.a>
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
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                </motion.button>
              ))}
              <motion.a
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
              </motion.a>
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
          </motion.div>
        )}
      </AnimatePresence>

      <Notebook isOpen={notebookOpen} onClose={() => setNotebookOpen(false)} />
    </>
  );
};

export default Navigation;
