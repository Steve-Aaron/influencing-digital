import React from 'react';
import BrandPage from './BrandPage';

const BRAND = {
  name: 'Forward BG',
  tag: 'Digital Platform · Bulgaria',
  description: 'A forward-thinking digital platform championing progressive values and evidence-based policy for a better Bulgaria. Built for people who believe the country is capable of more than its recent history suggests.',
  about1: 'Forward BG exists because progressive politics in Bulgaria has often struggled to translate its values into a vocabulary that lands with ordinary people. The platform is built to close that gap — taking ideas that have worked elsewhere in Europe and making the argument, in plain language, for why they could work in Bulgaria too.',
  about2: 'The editorial line is openly progressive but not dogmatically so. Forward BG publishes criticism of progressive policy when the evidence warrants it, engages seriously with objections rather than dismissing them, and treats its audience as people who can handle complexity. The goal is a better Bulgaria, not a politically correct one.',
  pillars: [
    {
      title: 'Progressive policy',
      body: 'Detailed coverage of policy proposals, their evidence base, and their likely effects — with a consistent focus on what has actually been tried elsewhere and what the outcomes were.',
    },
    {
      title: 'Civic technology',
      body: 'Tools and resources that make civic participation more accessible: electoral data, legislative trackers, open budget visualisations, and guides to public institutions.',
    },
    {
      title: 'European perspective',
      body: 'Connecting Bulgarian policy debates to the broader European conversation. What are other EU member states doing on housing, healthcare, and education, and what can Bulgaria learn from them?',
    },
    {
      title: 'Youth & future',
      body: 'Coverage built for and with younger Bulgarians — the generation that will live with the consequences of today\'s policy choices longest, and whose engagement with public life is essential to any meaningful change.',
    },
  ],
  heroImage: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=1600&q=85',
  accentColor: '#1a3a1a',
  stats: [
    { value: '4', label: 'Content Pillars' },
    { value: '27', label: 'EU Countries Tracked' },
    { value: '5', label: 'Languages' },
  ],
};

export default function ForwardBG() {
  return <BrandPage {...BRAND} />;
}
