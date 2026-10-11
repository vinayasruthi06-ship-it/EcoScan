import { useState } from 'react';
import { Leaf, Menu, X, Camera, CheckCircle } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* Top Left: Logo */}
        <div className="logo-group">
          <div className="logo-badge">
            <Leaf className="logo-icon" />
            <div className="logo-pulse"></div>
          </div>
          <div className="logo-text-block">
            <span className="logo-title">
              Eco<span className="logo-highlight">Scan</span>
            </span>
            <span className="logo-tagline">SMART RECYCLING</span>
          </div>
        </div>

        {/* Center / Desktop Links */}
        <div className="nav-links">
          <a href="#scan" className="nav-link active">Home</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#categories" className="nav-link">Waste Guide</a>
          <a href="#impact" className="nav-link">Impact</a>
        </div>

        {/* Right Action */}
        <div className="nav-actions">
          <div className="eco-badge">
            <CheckCircle size={15} className="eco-badge-icon" />
            <span>Eco Portal</span>
          </div>
          <a href="#scan" className="cta-button">
            <Camera size={16} />
            <span>Take Photo</span>
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#scan" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#how-it-works" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#categories" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Waste Guide</a>
          <a href="#impact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Impact</a>
          <a href="#scan" className="cta-button mobile-cta" onClick={() => setMobileMenuOpen(false)}>
            <Camera size={16} />
            <span>Take Photo</span>
          </a>
        </div>
      )}
    </header>
  );
}
