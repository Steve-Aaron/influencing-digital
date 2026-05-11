import React from 'react';

const ITEMS = [
  'Zdrav Razum', 'Bulgaria Watch', 'Forward BG', 'Tradition & Future',
  'Digital Influence', 'Authentic Reach', 'Data-Driven', 'Content Strategy',
  'Brand Building', 'Community Growth', 'SEO & Growth', 'Influencer Relations',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  );
}
