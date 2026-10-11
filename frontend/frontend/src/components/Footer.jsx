import { Leaf, Heart, Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo-group">
            <div className="logo-badge">
              <Leaf className="logo-icon" />
            </div>
            <div className="logo-text-block">
              <span className="logo-title">
                Eco<span className="logo-highlight">Scan</span>
              </span>
              <span className="logo-tagline">SMART RECYCLING</span>
            </div>
          </div>
          <p className="footer-description">
            Empowering communities to eliminate waste contamination with easy digital waste sorting tools.
            Together for a cleaner, greener earth.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <a href="#scan">Scan Waste</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#categories">Waste Guide</a>
            <a href="#impact">Our Impact</a>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Streams</h4>
            <a href="#categories">Plastics & Cans</a>
            <a href="#categories">Cardboard & Paper</a>
            <a href="#categories">Food & Organic</a>
            <a href="#categories">Batteries & E-Waste</a>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Initiative</h4>
            <span className="footer-tag">
              <Globe size={14} /> Zero Waste Alliance
            </span>
            <p className="footer-subtext">Open environmental platform.</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} EcoScan. Designed with{' '}
          <Heart size={14} className="heart-icon" /> for a zero-waste future.
        </p>
        <button
          type="button"
          className="btn-scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
