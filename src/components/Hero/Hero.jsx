import { motion } from 'framer-motion';
import { personalInfo } from '../../data/content';
import './Hero.css';

const Hero = () => {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const name = personalInfo.name;

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-vignette"></div>
      </div>
      
      <div className="hero-content">
        <motion.div 
          className="hero-ornament-top"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="ornament-symbol">❧</span>
        </motion.div>

        <motion.p 
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Portfolio of
        </motion.p>

        <motion.h1 
          className="hero-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {name.split('').map((char, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants}
              className={char === ' ' ? 'space' : ''}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div 
          className="hero-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        <motion.p 
          className="hero-mission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          "{personalInfo.mission}"
        </motion.p>

        <motion.div 
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <span className="scroll-text">Scroll to explore</span>
          <motion.div 
            className="scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <div className="hero-side-text left">
        <span>MMXXVI</span>
      </div>
      
      <div className="hero-side-text right">
        <span>San Jose, CA</span>
      </div>
    </section>
  );
};

export default Hero;
