import React from 'react';
import BrandPage from './BrandPage';

const BRAND = {
  name: 'People of Bulgaria',
  tag: 'Community Stories · Bulgaria',
  description: 'Real stories from real Bulgarians. People of Bulgaria puts faces to a country that is often reduced to statistics and headlines — capturing the voices, choices, and everyday lives of ordinary people across the country and the diaspora.',
  about1: 'People of Bulgaria was built on the observation that most coverage of the country focuses on its institutions, its politicians, and its problems — and almost none of it focuses on the people who actually live there. The platform is a deliberate correction: long-form portrait journalism that takes its subjects seriously and gives them room to speak in their own words.',
  about2: 'The format is simple. Each story follows one person or one community, in enough depth that the reader comes away with a genuine sense of what their life looks like and what they think about it. The cumulative effect is something closer to a social portrait of the country than any polling or official data could provide — because it captures the things that numbers are not designed to measure.',
  pillars: [
    {
      title: 'Personal portraits',
      body: 'Long-form stories about individual Bulgarians — their work, their families, their relationship to the country, and their sense of what the future holds. Written with care, not condescension.',
    },
    {
      title: 'Community life',
      body: 'Stories about the places where Bulgarians gather, organise, and build something together. Villages, neighbourhoods, professions, subcultures — the social fabric that official Bulgaria tends to overlook.',
    },
    {
      title: 'Diaspora voices',
      body: 'Bulgarians who have left — and those who have come back. What drove them out, what keeps them wherever they are, and what connection to Bulgaria they have managed to maintain or rebuild.',
    },
    {
      title: 'Generational change',
      body: 'How different generations of Bulgarians understand the country\'s past and their own place in its future. The conversations that happen between grandparents and grandchildren about what was lost, what was gained, and what comes next.',
    },
  ],
  heroImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=85',
  accentColor: '#5C3A1E',
  stats: [
    { value: '250M+', label: 'Social Impressions' },
    { value: '8', label: 'Countries' },
    { value: '5', label: 'Languages' },
  ],
  facebookUrl: 'https://www.facebook.com/profile.php?id=61582790788167',
};

export default function PeopleOfBulgaria() {
  return <BrandPage {...BRAND} />;
}
