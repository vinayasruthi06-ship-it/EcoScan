import { PackageCheck, Apple, BatteryCharging, Trash } from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    {
      title: 'Recyclables',
      binName: 'Blue Bin',
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      icon: <PackageCheck size={26} />,
      items: ['Clean plastic bottles (PET, HDPE)', 'Cardboard & paper', 'Aluminum & tin cans', 'Glass bottles & jars'],
      rule: 'Rinse thoroughly and remove oily food residue.'
    },
    {
      title: 'Organics & Compost',
      binName: 'Green Bin',
      badgeColor: '#16a34a',
      badgeBg: '#f0fdf4',
      icon: <Apple size={26} />,
      items: ['Fruit & vegetable peels', 'Coffee grounds & tea leaves', 'Yard trimmings & leaves', 'Food-soiled paper napkins'],
      rule: 'Never include plastic stickers, foils, or treated wood.'
    },
    {
      title: 'Hazardous / E-Waste',
      binName: 'Drop-off Depot',
      badgeColor: '#dc2626',
      badgeBg: '#fef2f2',
      icon: <BatteryCharging size={26} />,
      items: ['Alkaline & lithium batteries', 'Old phones & cables', 'Fluorescent light bulbs', 'Paint & chemical cans'],
      rule: 'Never throw in regular bins to prevent soil contamination.'
    },
    {
      title: 'General Landfill',
      binName: 'Black Bin',
      badgeColor: '#475569',
      badgeBg: '#f1f5f9',
      icon: <Trash size={26} />,
      items: ['Chip bags & foil snack wrappers', 'Styrofoam packaging', 'Broken ceramics & mirrors', 'Plastic straws & cutlery'],
      rule: 'Aim to reduce and replace with reusable alternatives.'
    }
  ];

  return (
    <section id="categories" className="categories-section">
      <div className="section-header">
        <span className="section-eyebrow">RECYCLING KNOWLEDGE BASE</span>
        <h2 className="section-title">Waste Sorting Guide</h2>
        <p className="section-subtitle">
          Learn which everyday household items belong in each stream to prevent contamination.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((cat, i) => (
          <div key={i} className="category-card">
            <div className="category-card-top">
              <div className="category-icon-box" style={{ color: cat.badgeColor, backgroundColor: cat.badgeBg }}>
                {cat.icon}
              </div>
              <span className="category-bin-pill" style={{ color: cat.badgeColor, backgroundColor: cat.badgeBg }}>
                {cat.binName}
              </span>
            </div>

            <h3 className="category-card-title">{cat.title}</h3>

            <ul className="category-items-list">
              {cat.items.map((item, idx) => (
                <li key={idx} className="category-item-point">
                  <span className="bullet-dot" style={{ backgroundColor: cat.badgeColor }}></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="category-rule-box">
              <strong>Tip:</strong> {cat.rule}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
