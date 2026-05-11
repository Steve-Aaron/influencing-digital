import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FadeUp, ImageReveal } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

const PARTNERS = [
  { name: 'European Media Hub', cat: 'cat1', icon: '📡' },
  { name: 'Digital Rights Watch', cat: 'cat3', icon: '🛡️' },
  { name: 'Balkan Tech Forum', cat: 'cat2', icon: '💻' },
  { name: 'Sofia Press Club', cat: 'cat1', icon: '📰' },
  { name: 'Open Data Initiative', cat: 'cat3', icon: '📊' },
  { name: 'Creative Europe Network', cat: 'cat4', icon: '🎨' },
  { name: 'East European Media Observatory', cat: 'cat3', icon: '🔭' },
  { name: 'Balkan Digital Agency', cat: 'cat2', icon: '⚡' },
];

export default function Partners() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead pageTitle={t('nav.partners')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1.5rem' }}>{t('partners.heroLabel')}</div>
              <h1 className="display-xl">{t('partners.heroHeadline')}</h1>
              <p className="page-hero-sub">{t('partners.heroSub')}</p>
            </FadeUp>
          </div>
        </section>

        {/* ── Partners grid ── */}
        <section className="section section-border">
          <div className="container">
            <FadeUp>
              <h2 className="display-md" style={{ marginBottom: '1.5rem' }}>{t('partners.sectionHeadline')}</h2>
              <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '60ch' }}>
                {t('partners.sectionBody')}
              </p>
            </FadeUp>
            <div className="partners-grid">
              {PARTNERS.map((p, i) => (
                <motion.div
                  key={i}
                  className="partner-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="partner-logo">{p.icon}</div>
                  <div className="partner-name">{p.name}</div>
                  <div className="partner-cat">{t(`partners.${p.cat}`)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Image ── */}
        <ImageReveal
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
          alt="Partnership meeting"
          style={{ height: 'clamp(250px, 40vw, 500px)' }}
        />

        {/* ── Become a partner CTA ── */}
        <section className="section section-border" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <div className="two-col">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>{t('partners.becomeLabel')}</div>
                <h2 className="display-md">{t('partners.becomeHeadline')}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  {t('partners.becomeBody')}
                </p>
                <Link to="/contact" className="btn btn-filled">{t('partners.becomeCta')}</Link>
              </FadeUp>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
