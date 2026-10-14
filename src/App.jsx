import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import Research from './components/Research/Research';
import Readings from './components/Readings/Readings';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <Navigation />
      <main>
        <About />
        <Research />
        <Gallery />
        <Readings />
      </main>
      <Footer />
    </>
  );
}

export default App;
