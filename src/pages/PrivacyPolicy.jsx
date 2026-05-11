import React from 'react';
import { useTranslation } from 'react-i18next';
import { FadeUp } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

const SECTIONS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'];

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead pageTitle={t('privacy.title')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <h1 className="display-lg">{t('privacy.title')}</h1>
              <p className="label" style={{ marginTop: '1rem' }}>{t('privacy.lastUpdated')}</p>
            </FadeUp>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="section section-border">
          <div className="container">
            <div className="privacy-content">
              <FadeUp>
                <p className="privacy-intro">{t('privacy.intro')}</p>
              </FadeUp>
              {SECTIONS.map((s, i) => (
                <FadeUp key={s} delay={i * 0.04}>
                  <div className="privacy-section">
                    <h2 className="privacy-section-title">{t(`privacy.${s}Title`)}</h2>
                    <p className="privacy-section-body">{t(`privacy.${s}Body`)}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
