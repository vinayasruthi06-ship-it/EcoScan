import { Camera, CheckCircle2, Trash2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Camera size={26} />,
      title: 'Snap or Upload',
      description: 'Point your camera at any waste item or upload a photo directly from your device.'
    },
    {
      num: '02',
      icon: <CheckCircle2 size={26} />,
      title: 'Review Picture Intake',
      description: 'Check the captured image preview, verify quality, and submit when ready.'
    },
    {
      num: '03',
      icon: <Trash2 size={26} />,
      title: 'Sort With Confidence',
      description: 'Follow standard waste category guidelines and place in the correct bin stream.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-header">
        <span className="section-eyebrow">SIMPLE 3-STEP PROCESS</span>
        <h2 className="section-title">How EcoScan Works</h2>
        <p className="section-subtitle">
          Quick and intuitive photo intake designed for seamless waste identification.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.num} className="step-card">
            <span className="step-number">{step.num}</span>
            <div className="step-icon-circle">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
