import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

const STEPS = ['step1', 'step2', 'step3', 'step4'];
const BENEFITS = ['ben1', 'ben2', 'ben3', 'ben4', 'ben5', 'ben6'];

export default function Affiliation() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead pageTitle={t('nav.affiliation')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1.5rem' }}>{t('affiliation.heroLabel')}</div>
              <h1 className="display-xl">{t('affiliation.heroHeadline')}</h1>
              <p className="page-hero-sub">{t('affiliation.heroSub')}</p>
            </FadeUp>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="section section-border">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1rem' }}>{t('affiliation.howLabel')}</div>
              <h2 className="display-md">{t('affiliation.howHeadline')}</h2>
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
                  <div className="process-num">{t(`affiliation.${s}Num`)}</div>
                  <div className="process-title">{t(`affiliation.${s}Title`)}</div>
                  <p className="process-desc">{t(`affiliation.${s}Desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="section section-border" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1rem' }}>{t('affiliation.benefitsLabel')}</div>
              <h2 className="display-md">{t('affiliation.benefitsHeadline')}</h2>
            </FadeUp>
            <div className="benefits-grid">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b}
                  className="benefit-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="benefit-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="benefit-title">{t(`affiliation.${b}Title`)}</div>
                  <p className="benefit-desc">{t(`affiliation.${b}Desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Apply ── */}
        <section className="section section-border">
          <div className="container">
            <div className="two-col">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>{t('affiliation.applyLabel')}</div>
                <h2 className="display-md">{t('affiliation.applyHeadline')}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  {t('affiliation.applyBody')}
                </p>
                <Link to="/contact" className="btn btn-filled">{t('affiliation.applyCta')}</Link>
              </FadeUp>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
