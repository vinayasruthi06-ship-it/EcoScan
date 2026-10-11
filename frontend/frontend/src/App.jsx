import Navbar from './components/Navbar';
import ScanWidget from './components/ScanWidget';
import StatsBar from './components/StatsBar';
import HowItWorks from './components/HowItWorks';
import CategoriesSection from './components/CategoriesSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <ScanWidget />
        <StatsBar />
        <HowItWorks />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
