import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FadeUp, ImageReveal } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

const VALUES = [
  { icon: '✦', key: 'val1' },
  { icon: '◎', key: 'val2' },
  { icon: '→', key: 'val3' },
  { icon: '◇', key: 'val4' },
];

export default function Purpose() {
  const { t } = useTranslation();
  const manifesto = t('purpose.manifesto', { returnObjects: true });

  return (
    <>
      <SEOHead pageTitle={t('nav.purpose')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1.5rem' }}>{t('purpose.heroLabel')}</div>
            </FadeUp>
            <h1 className="display-xl" style={{ whiteSpace: 'pre-line' }}>
              {t('purpose.heroHeadline').split('\n').map((line, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'block', overflow: 'hidden' }}
                >
                  <motion.span
                    style={{ display: 'block' }}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15, duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {i === 1 ? <em>{line}</em> : line}
                  </motion.span>
                </motion.span>
              ))}
            </h1>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="section section-border">
          <div className="container">
            <div className="two-col">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>{t('purpose.missionLabel')}</div>
                <h2 className="display-md">{t('purpose.missionHeadline')}</h2>
              </FadeUp>
              <div>
                <FadeUp delay={0.1}>
                  <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                    {t('purpose.missionBody1')}
                  </p>
                  <p className="body-lg" style={{ color: 'var(--text-muted)' }}>
                    {t('purpose.missionBody2')}
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── Image ── */}
        <ImageReveal
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
          alt="Our team"
          style={{ height: 'clamp(300px, 45vw, 600px)' }}
        />

        {/* ── Values ── */}
        <section className="section section-border">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1rem' }}>{t('purpose.valuesLabel')}</div>
              <h2 className="display-md">{t('purpose.valuesHeadline')}</h2>
            </FadeUp>
            <div className="values-grid">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.key}
                  className="value-item"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="value-icon" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>{v.icon}</div>
                  <div className="value-title">{t(`purpose.${v.key}Title`)}</div>
                  <p className="value-body">{t(`purpose.${v.key}Body`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Manifesto ── */}
        <section className="section section-border" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1rem' }}>{t('purpose.manifestoLabel')}</div>
              <h2 className="display-md" style={{ marginBottom: '0.5rem' }}>{t('purpose.manifestoHeadline')}</h2>
            </FadeUp>
            <div className="manifesto-list">
              {Array.isArray(manifesto) && manifesto.map((item, i) => (
                <motion.div
                  key={i}
                  className="manifesto-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
