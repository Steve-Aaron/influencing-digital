import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { AnimatedLines, FadeUp } from '../components/AnimatedText';
import Marquee from '../components/Marquee';
import Globe from '../components/Globe';
import TestimonialSlider from '../components/TestimonialSlider';
import SEOHead from '../components/SEOHead';

/* ─── Animated counter ───────────────────────────────────────────────────────── */
function Counter({ target }) {
  const [display, setDisplay] = useState('0');
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num     = parseFloat(target.replace(/[^0-9.]/g, ''));
    const hasPlus = target.includes('+');
    const hasM    = target.includes('M');
    let start     = null;
    const dur     = 1600;

    const tick = (ts) => {
      if (!start) start = ts;
      const prog  = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      const val   = Math.floor(eased * num);
      setDisplay(hasM ? `${val}M${hasPlus ? '+' : ''}` : `${val}${hasPlus ? '+' : ''}`);
      if (prog < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Stat with hover tooltip ────────────────────────────────────────────────── */
function StatItem({ val, label, tip }) {
  return (
    <div className="stat-item">
      {tip && <div className="stat-tooltip">{tip}</div>}
      <div className="stat-value"><Counter target={val} /></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─── Expandable feature item (reveal on hover + click) ─────────────────────── */
function FeatureItem({ num, title, body, borderRight, delay }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        className={`feature-item${expanded ? ' expanded' : ''}`}
        style={{ border: 'none', borderRight: borderRight ? '1px solid var(--border)' : 'none' }}
        onClick={() => setExpanded(v => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <div className="feature-num">{num}</div>
        <div className="feature-title">{title}</div>
        <div className="feature-body">{body}</div>
        <div className="feature-reveal-hint">Hover or click to read more</div>
      </div>
    </FadeUp>
  );
}

const BRANDS = [
  { key: 'brand1', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80', url: 'https://zdrav-razum.com' },
  { key: 'brand2', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80', url: '#' },
  { key: 'brand3', img: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=800&q=80', url: '#' },
  { key: 'brand4', img: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=800&q=80', url: '#' },
];

/* Globe is ~1.3× the viewport width so only ~28% is visible on the right */
function useGlobeSize() {
  const [size, setSize] = useState(1200);
  useEffect(() => {
    function update() {
      // Enormous size so only a quarter arc is visible
      setSize(Math.round(Math.max(window.innerWidth * 1.35, window.innerHeight * 1.6)));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function Home() {
  const { t }     = useTranslation();
  const globeSize = useGlobeSize();

  const stats = [
    { val: t('home.stat1Value'), label: t('home.stat1Label'), tip: t('home.stat1Tip') },
    { val: t('home.stat2Value'), label: t('home.stat2Label'), tip: t('home.stat2Tip') },
    { val: t('home.stat3Value'), label: t('home.stat3Label'), tip: t('home.stat3Tip') },
    { val: t('home.stat4Value'), label: t('home.stat4Label'), tip: t('home.stat4Tip') },
  ];

  const features = [
    { num: '01', title: t('home.feat1Title'), body: t('home.feat1Body') },
    { num: '02', title: t('home.feat2Title'), body: t('home.feat2Body') },
    { num: '03', title: t('home.feat3Title'), body: t('home.feat3Body') },
  ];

  const testimonials = t('home.testimonials', { returnObjects: true }) || [];

  /*
   * Hero headline: third line wraps the locale-specific highlight word in a span.
   * heroHighlightWord is the word to highlight (e.g. "endures." in EN).
   * AnimatedLines accepts React nodes, so we pass a JSX element for the last line.
   */
  const line3Raw   = t('home.heroLine3');
  const highlight  = t('home.heroHighlightWord');
  const hlIdx      = highlight ? line3Raw.lastIndexOf(highlight) : -1;
  const line3Node  = hlIdx !== -1
    ? <>{line3Raw.slice(0, hlIdx)}<span className="hero-highlight">{highlight}</span>{line3Raw.slice(hlIdx + highlight.length)}</>
    : line3Raw;

  const heroLines = [
    t('home.heroLine1'),
    t('home.heroLine2'),
    line3Node,
  ];

  return (
    <>
      <SEOHead />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="hero section-border" style={{ minHeight: '88vh', padding: 'clamp(5rem,10vw,8rem) 0 clamp(4rem,7vw,6rem)' }}>
          <div className="container">
            <div className="hero-content">
              <div className="hero-label label">{t('home.statsLabel')}</div>
              <h1 className="display-xl" style={{ marginTop: '0.75rem' }}>
                <AnimatedLines lines={heroLines} />
              </h1>
              <motion.p
                className="body-lg"
                style={{ marginTop: '2rem', color: 'var(--text-muted)', maxWidth: '46ch' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                {t('home.heroSub')}
              </motion.p>
              <motion.div
                style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                <Link to="/brands" className="btn btn-filled">{t('home.heroCta1')}</Link>
                <Link to="/contact" className="btn">{t('home.heroCta2')}</Link>
              </motion.div>
            </div>
          </div>

          {/* Enormous globe — only a quarter arc visible on the right.
              Outer div carries the CSS positioning so framer-motion's
              inline transform (scale animation) cannot clobber translateY. */}
          <div className="hero-globe-large">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
            >
              <Globe size={globeSize} />
            </motion.div>
          </div>

          <div className="hero-globe-hint">Drag to rotate</div>
        </section>

        {/* ── Stats strip ── */}
        <section className="stats-strip">
          <div className="container" style={{ padding: 0 }}>
            <div className="stats-grid">
              {stats.map((s, i) => (
                <StatItem key={i} val={s.val} label={s.label} tip={s.tip} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <Marquee />

        {/* ── What we do ── */}
        <section className="section section-border">
          <div className="container">
            <div className="two-col">
              <div>
                <FadeUp>
                  <div className="label" style={{ marginBottom: '1.5rem' }}>{t('home.whatLabel')}</div>
                  <h2 className="display-md">{t('home.whatHeadline')}</h2>
                </FadeUp>
              </div>
              <div>
                <FadeUp delay={0.1}>
                  <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                    {t('home.whatBody')}
                  </p>
                </FadeUp>
                <div className="features-grid">
                  {features.map((f, i) => (
                    <FeatureItem
                      key={i}
                      num={f.num}
                      title={f.title}
                      body={f.body}
                      borderRight={i < 2}
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brands preview ── */}
        <section className="section section-border">
          <div className="container">
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div className="label" style={{ marginBottom: '1rem' }}>{t('home.brandsLabel')}</div>
                  <h2 className="display-md">{t('home.brandsHeadline')}</h2>
                </div>
                <Link to="/brands" className="btn">{t('home.brandsViewAll')}</Link>
              </div>
            </FadeUp>

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
                    <div className="brand-card-overlay">
                      <span className="brand-card-overlay-tag">{t(`brands.${b.key}Tag`)}</span>
                    </div>
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

        {/* ── Testimonial Slider (sticky horizontal scroll-jacking) ── */}
        <TestimonialSlider
          testimonials={testimonials}
          label={t('home.testimonialsLabel')}
          heading={t('home.testimonialsHeading')}
        />

        {/* ── CTA ── */}
        <section className="cta-banner">
          <div className="container">
            <FadeUp>
              <h2 className="display-lg">{t('home.ctaHeadline')}</h2>
              <p className="body-lg">{t('home.ctaBody')}</p>
              <Link to="/contact" className="btn">{t('home.ctaButton')}</Link>
            </FadeUp>
          </div>
        </section>

      </div>
    </>
  );
}
