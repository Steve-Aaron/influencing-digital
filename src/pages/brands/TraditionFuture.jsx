import React from 'react';
import BrandPage from './BrandPage';

const BRAND = {
  name: 'Tradition & Future',
  tag: 'Cultural Media · Bulgaria',
  description: 'Bulgarian cultural heritage is a living resource. Tradition & Future publishes stories about what that resource contains, how it has been used, and what it might still be worth to people who have not yet thought to ask.',
  about1: 'Tradition & Future begins with a useful observation: a culture that forgets its own methods for surviving difficulty is not liberated; it is merely less equipped. Bulgarian folklore, craft, ritual, and language carry accumulated knowledge about how communities have organised themselves under pressure. The platform makes that knowledge legible to people who would benefit from it but may not know where to look.',
  about2: 'The editorial approach is curious rather than reverential. Tradition & Future publishes stories about where Bulgarian traditions come from, how they have changed, what they mean to the people who still practise them, and what contemporary life might learn from them. It also publishes stories about traditions that have been lost and whether they are worth recovering.',
  pillars: [
    {
      title: 'Living traditions',
      body: 'Stories about Bulgarians who are still practising traditional crafts, customs, and arts; for them, this is a genuine part of daily life, not a performance for tourists. The people behind the practices, not just the practices themselves.',
    },
    {
      title: 'Cultural heritage',
      body: 'Deep dives into the history and meaning of Bulgarian folk music, Kukeri ritual, rose cultivation, iconography, and the other traditions that define the country\'s cultural identity at home and abroad.',
    },
    {
      title: 'Modern interpretations',
      body: 'How Bulgarian designers, musicians, architects, and artists are drawing on traditional forms to produce contemporary work. The conversation between old and new that produces something neither could achieve alone.',
    },
    {
      title: 'Diaspora culture',
      body: 'How Bulgarians living abroad maintain, adapt, and transmit their cultural identity across generations and borders. What survives, what changes, and what gets invented to fill the gaps.',
    },
  ],
  heroImage: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=1600&q=85',
  accentColor: '#8B1A1A',
  stats: [
    { value: '4', label: 'Content Pillars' },
    { value: '5', label: 'Languages' },
    { value: '8', label: 'Countries' },
  ],
  facebookUrl: 'https://www.facebook.com/profile.php?id=61582879254499',
};

export default function TraditionFuture() {
  return <BrandPage {...BRAND} />;
}
