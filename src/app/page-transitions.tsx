"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function PageTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion !== false || !("IntersectionObserver" in window)) {
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-section-reveal", "visible");
            revealObserver.unobserve(entry.target);
          } else {
            entry.target.setAttribute("data-section-reveal", "pending");
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const prepareSections = (root: ParentNode) => {
      const sections = new Set(
        root.querySelectorAll("main > section, [data-scroll-reveal]"),
      );
      if (
        root instanceof Element &&
        root.matches("main > section, [data-scroll-reveal]")
      ) {
        sections.add(root);
      }

      sections.forEach((section) => {
        if (section.hasAttribute("data-section-reveal")) {
          return;
        }

        const staggerGroup = section.parentElement?.hasAttribute(
          "data-scroll-stagger",
        )
          ? section.parentElement
          : null;
        if (staggerGroup) {
          const siblings = Array.from(staggerGroup.children).filter((child) =>
            child.matches("main > section, [data-scroll-reveal]"),
          );
          const index = siblings.indexOf(section);
          if (section instanceof HTMLElement) {
            section.style.setProperty(
              "--scroll-reveal-delay",
              `${Math.min(index * 70, 350)}ms`,
            );
          }
        }

        revealObserver.observe(section);
      });
    };

    prepareSections(document);
    const pageObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            prepareSections(node);
          }
        });
      });
    });

    pageObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      pageObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        className="relative z-10 flex-1"
        initial={
          prefersReducedMotion === false ? { opacity: 0, y: 14 } : false
        }
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{
          duration: prefersReducedMotion === false ? 0.42 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
