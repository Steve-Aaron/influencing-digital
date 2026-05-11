import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

const BRANDS = [
  {
    key: 'brand1',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80',
    url: 'https://zdrav-razum.com',
    color: '#1a1a2e',
  },
  {
    key: 'brand2',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
    url: '#',
    color: '#1e3a5f',
  },
  {
    key: 'brand3',
    img: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=900&q=80',
    url: '#',
    color: '#1a3a1a',
  },
  {
    key: 'brand4',
    img: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=900&q=80',
    url: '#',
    color: '#3d1515',
  },
];

export default function Brands() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead pageTitle={t('nav.brands')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1.5rem' }}>{t('brands.heroLabel')}</div>
              <h1 className="display-xl">{t('brands.heroHeadline')}</h1>
              <p className="page-hero-sub">{t('brands.heroSub')}</p>
            </FadeUp>
          </div>
        </section>

        {/* ── Brand cards ── */}
        <section className="section section-border">
          <div className="container">
            <div className="brands-grid">
              {BRANDS.map((b, i) => (
                <motion.div
                  key={b.key}
                  className="brand-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <img src={b.img} alt={t(`brands.${b.key}Name`)} className="brand-card-img" />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(to top, ${b.color}cc 0%, transparent 60%)`,
                    }} />
                  </div>
                  <div className="brand-card-body">
                    <div className="brand-card-tag">{t(`brands.${b.key}Tag`)}</div>
                    <div className="brand-card-name">{t(`brands.${b.key}Name`)}</div>
                    <p className="brand-card-desc">{t(`brands.${b.key}Desc`)}</p>
                    <a
                      href={b.url}
                      target={b.url !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="brand-card-link"
                    >
                      {t('common.viewBrand')}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Join CTA ── */}
        <section className="section section-border" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <div className="two-col">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>{t('brands.joinLabel')}</div>
                <h2 className="display-md">{t('brands.joinHeadline')}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  {t('brands.joinBody')}
                </p>
                <Link to="/contact" className="btn btn-filled">{t('brands.joinCta')}</Link>
              </FadeUp>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
