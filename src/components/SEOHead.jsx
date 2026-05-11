import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const descriptions = {
  en: 'Influencing Digital is a network of digital brands building authentic influence across Europe and beyond.',
  es: 'Influencing Digital es una red de marcas digitales que construye influencia auténtica en Europa y más allá.',
  it: 'Influencing Digital è una rete di brand digitali che costruisce un\'influenza autentica in Europa e oltre.',
  bg: 'Influencing Digital е мрежа от дигитални марки, изграждащи автентично влияние в Европа и отвъд нея.',
  fr: 'Influencing Digital est un réseau de marques numériques qui construit une influence authentique en Europe et au-delà.',
};

export default function SEOHead({ pageTitle }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  useEffect(() => {
    const desc = descriptions[lang] || descriptions['en'];
    const fullTitle = pageTitle
      ? `${pageTitle} | Influencing Digital`
      : 'Influencing Digital | The Digital Influence Network';

    document.title = fullTitle;
    document.documentElement.lang = lang;

    // Update or create description meta
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = desc;

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = desc;

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = fullTitle;
  }, [lang, pageTitle]);

  return null;
}
