import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/AnimatedText';
import SEOHead from '../components/SEOHead';

// Sign up at https://formspree.io — replace with your real form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEOHead pageTitle={t('nav.contact')} />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="page-hero">
          <div className="container">
            <FadeUp>
              <div className="label" style={{ marginBottom: '1.5rem' }}>{t('contact.heroLabel')}</div>
              <h1 className="display-xl">{t('contact.heroHeadline')}</h1>
              <p className="page-hero-sub">{t('contact.heroSub')}</p>
            </FadeUp>
          </div>
        </section>

        {/* ── Contact content ── */}
        <section className="section section-border">
          <div className="container">
            <div className="contact-grid">

              {/* Form */}
              <FadeUp>
                {status === 'success' ? (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t('contact.formSuccess')}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label className="form-label">{t('contact.formName')}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-input"
                        placeholder={t('contact.formName')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.formEmail')}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.formCompany')}</label>
                      <input
                        type="text"
                        name="company"
                        className="form-input"
                        placeholder={t('contact.formCompany')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.formMessage')}</label>
                      <textarea
                        name="message"
                        required
                        className="form-textarea"
                        placeholder={t('contact.formMessage')}
                      />
                    </div>
                    {status === 'error' && (
                      <p className="form-error-msg">{t('contact.formError')}</p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-filled"
                      disabled={status === 'sending'}
                      style={{ alignSelf: 'flex-start' }}
                    >
                      {status === 'sending' ? t('contact.formSending') : t('contact.formSend')}
                    </button>
                  </form>
                )}
              </FadeUp>

              {/* Info */}
              <FadeUp delay={0.15}>
                <div className="contact-info-block">
                  <div className="contact-info-item">
                    <div className="contact-info-label">{t('contact.infoLabel')}</div>
                    <div className="contact-info-value">
                      <a href={`mailto:${t('contact.infoEmail')}`}>{t('contact.infoEmail')}</a>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      {t('contact.infoResponse')}
                    </p>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-label">{t('contact.followLabel')}</div>
                    <div className="social-links" style={{ marginTop: '0.75rem' }}>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                      <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-link">X</a>
                    </div>
                  </div>
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
