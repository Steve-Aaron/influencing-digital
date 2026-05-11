import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">
              Influencing<span>.</span>Digital
            </div>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          {/* Company links */}
          <div>
            <div className="footer-col-title">{t('footer.colCompany')}</div>
            <ul className="footer-links-list">
              <li><Link to="/purpose" className="footer-link">{t('nav.purpose')}</Link></li>
              <li><Link to="/services" className="footer-link">{t('nav.services')}</Link></li>
              <li><Link to="/affiliation" className="footer-link">{t('nav.affiliation')}</Link></li>
              <li><Link to="/contact" className="footer-link">{t('nav.contact')}</Link></li>
              <li><Link to="/privacy" className="footer-link">{t('footer.privacy')}</Link></li>
            </ul>
          </div>

          {/* Network links */}
          <div>
            <div className="footer-col-title">{t('footer.colNetwork')}</div>
            <ul className="footer-links-list">
              <li><Link to="/brands" className="footer-link">{t('nav.brands')}</Link></li>
              <li><Link to="/partners" className="footer-link">{t('nav.partners')}</Link></li>
              <li>
                <a href="https://zdrav-razum.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Zdrav Razum
                </a>
              </li>
              <li><a href="#" className="footer-link">Bulgaria Watch</a></li>
              <li><a href="#" className="footer-link">Forward BG</a></li>
              <li><a href="#" className="footer-link">Tradition & Future</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="footer-col-title">{t('footer.colConnect')}</div>
            <ul className="footer-links-list">
              <li>
                <a href="mailto:hello@influencing.digital" className="footer-link">
                  hello@influencing.digital
                </a>
              </li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-link">X / Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{t('footer.copyright')}</p>
          <Link to="/privacy" className="footer-privacy">{t('footer.privacy')}</Link>
        </div>
      </div>
    </footer>
  );
}
