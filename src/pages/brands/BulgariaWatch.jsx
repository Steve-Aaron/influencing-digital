import React from 'react';
import BrandPage from './BrandPage';

const BRAND = {
  name: 'Bulgaria Watch',
  tag: 'News & Analysis · Bulgaria',
  description: 'An independent platform monitoring Bulgarian media, politics, and society with rigorous, evidence-based analysis. Not a news outlet trying to break stories — a reference platform built to understand them.',
  about1: 'Bulgaria Watch was built for readers who have noticed that the Bulgarian media landscape produces a great deal of noise and a relatively small amount of clarity. The platform monitors political developments, media narratives, and social trends — not to add to the volume, but to make the existing volume more legible.',
  about2: 'The approach is methodical rather than reactive. Bulgaria Watch publishes analysis when there is something worth saying, not because the news cycle demands a response. That means longer pieces, more primary sources, and a consistent willingness to say when something is genuinely uncertain rather than filling the gap with confident-sounding guesses.',
  pillars: [
    {
      title: 'Political monitoring',
      body: 'Tracking legislative developments, party positioning, and electoral data with a focus on what has actually changed and why it matters, rather than what makes a good headline.',
    },
    {
      title: 'Media analysis',
      body: 'Examining how Bulgarian and international media covers the country — what framing choices get made, whose voices appear, and what tends to get left out. Journalism about journalism.',
    },
    {
      title: 'Society & trends',
      body: 'Long-form analysis of social change in Bulgaria: migration patterns, demographic shifts, public attitudes measured through polling, and the forces shaping daily life for ordinary Bulgarians.',
    },
    {
      title: 'Investigative reference',
      body: 'A growing archive of verified, sourced information on public institutions, political figures, and policy outcomes — built to be cited rather than clicked.',
    },
  ],
  heroImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=85',
  accentColor: '#1e3a5f',
  stats: [
    { value: '4', label: 'Coverage Areas' },
    { value: '8', label: 'Countries Monitored' },
    { value: '5', label: 'Languages' },
  ],
};

export default function BulgariaWatch() {
  return <BrandPage {...BRAND} />;
}
