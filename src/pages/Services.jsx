import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

const SERVICES = [
  { key: 'serv1', icon: '📐' },
  { key: 'serv2', icon: '🚀' },
  { key: 'serv3', icon: '✦' },
  { key: 'serv4', icon: '📈' },
  { key: 'serv5', icon: '🤝' },
  { key: 'serv6', icon: '🔍' },
];

const STEPS = ['step1', 'step2', 'step3', 'step4'];

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead pageTitle={t('nav.services')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1.5rem' }}>{t('services.heroLabel')}</div>
              <h1 className="display-xl">{t('services.heroHeadline')}</h1>
              <p className="page-hero-sub">{t('services.heroSub')}</p>
            </FadeUp>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section className="section section-border">
          <div className="container">
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.key}
                  className="service-item"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-title">{t(`services.${s.key}Title`)}</div>
                  <p className="service-desc">{t(`services.${s.key}Desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section section-border" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1rem' }}>{t('services.processLabel')}</div>
              <h2 className="display-md">{t('services.processHeadline')}</h2>
            </FadeUp>
            <div className="process-steps">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s}
                  className="process-step"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="process-num">{t(`services.${s}Num`)}</div>
                  <div className="process-title">{t(`services.${s}Title`)}</div>
                  <p className="process-desc">{t(`services.${s}Desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-banner">
          <div className="container">
            <FadeUp>
              <h2 className="display-lg">{t('services.ctaHeadline')}</h2>
              <p className="body-lg" style={{ margin: '1.5rem auto 2.5rem' }}>&nbsp;</p>
              <Link to="/contact" className="btn">{t('services.ctaButton')}</Link>
            </FadeUp>
          </div>
        </section>

      </div>
    </>
  );
}
