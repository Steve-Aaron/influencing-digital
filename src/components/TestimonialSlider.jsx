import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

/**
 * TestimonialSlider — sticky horizontal scroll-jacking.
 *
 * The outer wrapper has enough height to drive horizontal scrolling of all
 * cards. The inner div is `position: sticky; top: 0; height: 100vh` and
 * "takes over" the screen while the user scrolls. Once the last card is
 * reached, the wrapper ends and normal vertical scroll resumes.
 *
 * Card width: 80vw. Scroll distance = (count * 80vw) - 100vw.
 * Wrapper height = 100vh + scroll distance.
 */
export default function TestimonialSlider({ testimonials, label = 'CLIENT VOICES', heading }) {
  const wrapperRef  = useRef(null);
  const trackRef    = useRef(null);
  const [progress,    setProgress]    = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = testimonials.length;

  /* Compute card width in px (80vw) */
  function cardWidthPx() {
    return window.innerWidth * 0.8;
  }

  /* Total horizontal travel = total track width − viewport width */
  function maxTranslatePx() {
    return Math.max(0, count * cardWidthPx() - window.innerWidth);
  }

  /* Set the wrapper height so there is enough scroll room */
  function updateWrapperHeight() {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.height = `calc(100vh + ${maxTranslatePx()}px)`;
  }

  /* Scroll handler — translates the track horizontally */
  function handleScroll() {
    if (!wrapperRef.current || !trackRef.current) return;

    const rect      = wrapperRef.current.getBoundingClientRect();
    const scrolledIn = -rect.top;            // px scrolled past wrapper top
    const maxT       = maxTranslatePx();

    if (maxT <= 0) return;

    const prog = Math.max(0, Math.min(1, scrolledIn / maxT));

    // Apply horizontal transform directly for performance (skip re-render)
    trackRef.current.style.transform = `translateX(-${prog * maxT}px)`;

    // Update React state only when the bucket changes (avoids render churn)
    const idx = Math.min(count - 1, Math.floor(prog * count));
    setActiveIndex(prev => prev !== idx ? idx : prev);
    setProgress(prog);
  }

  useLayoutEffect(() => {
    updateWrapperHeight();
  }, [count]);

  useEffect(() => {
    updateWrapperHeight();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateWrapperHeight();
      handleScroll();
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWrapperHeight);
    };
  }, [count]);

  return (
    /* Outer wrapper — creates the vertical scroll space */
    <div ref={wrapperRef} className="testimonial-wrapper">

      {/* Sticky panel — locks to top while we scroll the wrapper */}
      <div className="testimonial-sticky">

        {/* Header */}
        <div className="testimonial-sticky-header">
          <div>
            <div className="label" style={{ marginBottom: '0.5rem' }}>{label}</div>
            <h2 className="display-md">{heading}</h2>
          </div>
          <div className="testimonial-card-counter">
            <strong>{activeIndex + 1}</strong> / {count}
          </div>
        </div>

        {/* Horizontal overflow area */}
        <div className="testimonial-overflow">
          <div ref={trackRef} className="testimonial-track">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card${i === activeIndex ? ' active' : ''}`}
              >
                <div className="testimonial-quote-mark">&ldquo;</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-meta">
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="testimonial-progress-bar">
          <div
            className="testimonial-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
}
