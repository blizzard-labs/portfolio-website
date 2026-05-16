import { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import Research from './components/Research/Research';
import Experience from './components/Experience/Experience';
import Prabha from './components/Prabha/Prabha';
import Readings from './components/Readings/Readings';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onLoadComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <div className="noise-overlay"></div>
          <Navigation />
          <main>
            <About />
            <Research />
            <Prabha />
            <Experience />
            <Gallery />
            <Readings />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
