import React from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from '../../components/AnimatedText';
import SEOHead from '../../components/SEOHead';

/* ─── Shared layout for every individual brand page ─────────────────────────
   Props:
     name        string   – brand display name
     tag         string   – e.g. "Political Campaign · Bulgaria"
     description string   – one-paragraph hero description
     about1      string   – first about paragraph
     about2      string?  – optional second about paragraph
     pillars     Array<{ title, body }>
     heroImage   string   – full-width background image URL
     accentColor string   – brand colour for numerals & stat values
     stats       Array<{ value, label }>
     facebookUrl string?
     instagramUrl string?
     websiteUrl  string?
──────────────────────────────────────────────────────────────────────────── */
export default function BrandPage({
  name,
  tag,
  description,
  about1,
  about2,
  pillars = [],
  heroImage,
  accentColor = 'var(--accent)',
  stats = [],
  facebookUrl,
  instagramUrl,
  websiteUrl,
}) {
  const COLS = 2;
  const totalPillars = pillars.length;

  return (
    <>
      <SEOHead pageTitle={name} />
      <div className="page-wrapper">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
          {/* Photo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          {/* Dark gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.18) 100%)',
          }} />
          {/* Accent left bar */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: accentColor,
          }} />

          <div className="container" style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(7rem,14vw,11rem) var(--pad-x)',
          }}>
            <FadeUp>
              <div className="label" style={{
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '1.25rem',
              }}>{tag}</div>

              <h1 className="display-xl" style={{
                color: '#fff',
                marginBottom: '1.75rem',
              }}>{name}</h1>

              <p style={{
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '52ch',
                fontSize: 'clamp(1rem,1.4vw,1.2rem)',
                lineHeight: 1.78,
                marginBottom: '2.5rem',
              }}>{description}</p>

              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-filled"
                  >
                    Visit site →
                  </a>
                )}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.38)' }}
                  >
                    Facebook →
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.38)' }}
                  >
                    Instagram →
                  </a>
                )}
                <Link
                  to="/contact"
                  className="btn"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.38)' }}
                >
                  Work with us →
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────────────── */}
        <section className="section section-border">
          <div className="container">
            <div className="two-col">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>ABOUT</div>
                <h2 className="display-md">{name}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="body-lg" style={{
                  color: 'var(--text-muted)',
                  marginBottom: about2 ? '1.5rem' : 0,
                }}>{about1}</p>
                {about2 && (
                  <p className="body-lg" style={{ color: 'var(--text-muted)' }}>{about2}</p>
                )}
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Content pillars ───────────────────────────────────────────── */}
        {pillars.length > 0 && (
          <section className="section section-border" style={{ background: 'var(--bg-alt)' }}>
            <div className="container">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>WHAT WE COVER</div>
                <h2 className="display-md" style={{ marginBottom: '3rem' }}>Content pillars.</h2>
              </FadeUp>

              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                border: '1px solid var(--border)',
              }}>
                {pillars.map((p, i) => {
                  const isLastInRow  = (i + 1) % COLS === 0;
                  const isLastRow    = i >= totalPillars - COLS;
                  return (
                    <FadeUp key={i} delay={i * 0.07}>
                      <div style={{
                        padding: '2.5rem 2.25rem',
                        borderRight:  isLastInRow ? 'none' : '1px solid var(--border)',
                        borderBottom: isLastRow   ? 'none' : '1px solid var(--border)',
                        height: '100%',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '3rem',
                          fontWeight: 900,
                          color: accentColor,
                          lineHeight: 1,
                          marginBottom: '1.5rem',
                          opacity: 0.3,
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div style={{
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          marginBottom: '0.75rem',
                        }}>{p.title}</div>
                        <div style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.9rem',
                          lineHeight: 1.72,
                        }}>{p.body}</div>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        {stats.length > 0 && (
          <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container" style={{ padding: 0 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              }}>
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="stat-item"
                    style={{ borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <div className="stat-value" style={{ color: accentColor }}>{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back to network ───────────────────────────────────────────── */}
        <section className="section section-border">
          <div className="container">
            <div className="two-col">
              <FadeUp>
                <div className="label" style={{ marginBottom: '1.5rem' }}>THE NETWORK</div>
                <h2 className="display-md">
                  Part of the Influencing<span style={{ color: 'var(--accent)' }}>.</span>Digital family.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="body-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  {name} is one of five brands in the Influencing Digital network — each built to serve
                  a distinct audience with a distinct purpose.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/brands" className="btn btn-filled">All brands →</Link>
                  <Link to="/contact" className="btn">Work with us →</Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
