import React from 'react';
import BrandPage from './BrandPage';

const BRAND = {
  name: 'Zdrav Razum',
  tag: 'Political Campaign · Bulgaria',
  description: 'A bold, data-driven political campaign bringing pragmatic common sense to Bulgarian public discourse. Zdrav Razum — "Common Sense" — makes the case that good governance is less about ideology and more about evidence.',
  about1: 'Zdrav Razum was built on a simple premise: that Bulgarian political discourse had become so saturated with performance and tribalism that the basic question — what actually works? — had stopped being asked. The campaign exists to ask it, consistently, using polling, comparative research, and documented policy outcomes from across Europe.',
  about2: 'Where other political voices compete to be the loudest, Zdrav Razum competes to be the most useful. That means publishing numbers when they are uncomfortable, crediting ideas from across the political spectrum when they have worked, and refusing to treat voters as an audience to be managed rather than a public to be served.',
  pillars: [
    {
      title: 'Evidence-based positions',
      body: 'Every policy argument the campaign advances is grounded in data and documented outcomes, not ideological assumption. When the evidence is mixed, we say so.',
    },
    {
      title: 'Original polling',
      body: 'We commission and publish original polling that reflects what Bulgarians actually think, rather than what parties wish they thought. Polling as a service to the public, not a tool for manipulation.',
    },
    {
      title: 'Media fact-checking',
      body: 'Helping Bulgarian audiences navigate a media landscape where political messaging and journalism have become difficult to distinguish. Source analysis, claim verification, methodological transparency.',
    },
    {
      title: 'Civic engagement',
      body: 'Making participation feel useful rather than performative. Tools, explainers, and resources that treat voters as people capable of drawing their own conclusions from good information.',
    },
  ],
  heroImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=85',
  accentColor: '#1a1a2e',
  stats: [
    { value: '250M+', label: 'Social Impressions' },
    { value: '8', label: 'Countries Reached' },
    { value: '5', label: 'Languages' },
  ],
  websiteUrl: 'https://zdrav-razum.com',
};

export default function ZdravRazum() {
  return <BrandPage {...BRAND} />;
}
