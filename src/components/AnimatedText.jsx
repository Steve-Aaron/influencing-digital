import React from 'react';
import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

/**
 * AnimatedLines — Renders each line with a clip-reveal (slide-up).
 * Pass `lines` as an array of strings.
 */
export function AnimatedLines({ lines, className = '', as = 'span' }) {
  const Tag = as;
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="hero-line" style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            custom={i}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'block' }}
            className={className}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/**
 * FadeUp — Simple fade-up on scroll using intersection observer.
 */
export function FadeUp({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren — Stagger-reveals direct children on scroll.
 */
export function StaggerChildren({ children, className = '', stagger = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {React.Children.map(children, (child, i) =>
        child ? (
          <motion.div
            key={i}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
            }}
          >
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  );
}

/**
 * ImageReveal — Clip-path reveal for images on scroll.
 */
export function ImageReveal({ src, alt, className = '', style = {} }) {
  return (
    <div className={`img-cover-wrap ${className}`} style={style}>
      <motion.img
        src={src}
        alt={alt}
        className="img-cover"
        initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.1 }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
}
