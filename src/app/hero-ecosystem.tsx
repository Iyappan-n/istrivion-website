"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent } from "react";
import { useEffect } from "react";

export default function HeroEcosystem() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), {
    stiffness: 85,
    damping: 22,
  });
  const pointerY = useSpring(useMotionValue(0), {
    stiffness: 85,
    damping: 22,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      pointerX.set(0);
      pointerY.set(0);
    }
  }, [pointerX, pointerY, prefersReducedMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion !== false || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    pointerX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      aria-hidden="true"
      className="hero-ecosystem"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="hero-ecosystem__parallax"
        style={{
          rotateX: prefersReducedMotion ? 0 : pointerX,
          rotateY: prefersReducedMotion ? 0 : pointerY,
        }}
      >
        <div className="hero-ecosystem__core" />
        <svg
          className="hero-ecosystem__trails"
          viewBox="0 0 520 460"
          fill="none"
        >
          <path
            className="hero-ecosystem__trail hero-ecosystem__trail--red"
            d="M56 202C140 164 161 105 255 126C341 145 374 239 468 215"
          />
          <path
            className="hero-ecosystem__trail hero-ecosystem__trail--silver"
            d="M60 331C163 373 219 324 269 271C330 205 379 107 471 127"
          />
        </svg>

        <div className="hero-ecosystem__panel hero-ecosystem__panel--dashboard">
          <div className="hero-ecosystem__panel-heading">
            <span className="hero-ecosystem__window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>Workspace</span>
          </div>
          <div className="hero-ecosystem__dashboard">
            <div className="hero-ecosystem__sidebar">
              <i className="is-active" />
              <i />
              <i />
              <i />
            </div>
            <div className="hero-ecosystem__dashboard-content">
              <span className="hero-ecosystem__ui-label">Project overview</span>
              <div className="hero-ecosystem__chart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="hero-ecosystem__dashboard-footer">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-ecosystem__panel hero-ecosystem__panel--editor">
          <div className="hero-ecosystem__panel-heading">
            <span className="hero-ecosystem__window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>experience.tsx</span>
          </div>
          <div className="hero-ecosystem__code">
            <span className="is-muted">01</span>
            <span>
              <b>export default</b> function Experience() {"{"}
            </span>
            <span className="is-muted">02</span>
            <span>
              &nbsp;&nbsp;return &lt;<em>main</em>&gt;
            </span>
            <span className="is-muted">03</span>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<em>Product</em> /&gt;
            </span>
            <span className="is-muted">04</span>
            <span>&nbsp;&nbsp;&lt;/main&gt;;</span>
            <span className="is-muted">05</span>
            <span>{"}"}</span>
          </div>
        </div>

        <div className="hero-ecosystem__panel hero-ecosystem__panel--mobile">
          <div className="hero-ecosystem__mobile-top">
            <span />
            <span />
          </div>
          <div className="hero-ecosystem__mobile-title" />
          <div className="hero-ecosystem__mobile-card">
            <span />
            <i />
            <i />
          </div>
          <div className="hero-ecosystem__mobile-action" />
        </div>

        <div className="hero-ecosystem__panel hero-ecosystem__panel--design">
          <span className="hero-ecosystem__ui-label">Design system</span>
          <div className="hero-ecosystem__swatches">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="hero-ecosystem__design-lines">
            <i />
            <i />
          </div>
        </div>

        <span className="hero-ecosystem__particle hero-ecosystem__particle--one" />
        <span className="hero-ecosystem__particle hero-ecosystem__particle--two" />
        <span className="hero-ecosystem__particle hero-ecosystem__particle--three" />
        <span className="hero-ecosystem__particle hero-ecosystem__particle--four" />
      </motion.div>
    </div>
  );
}
