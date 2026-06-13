"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

/**
 * Hero, GCSA Consulting | Homepage Hero
 *
 * Content (per gcsaconsulting.co.uk):
 * - Headline: "Taking Your Business to the Next Level"
 * - Sub: "We deploy our wealth of creative ideas in helping Businesses
 *   identify, acquire and deploy key capabilities required to adapt, grow,
 *   gain competitive advantage, defend a strategic position and/or exit
 *   a Crisis situation."
 * - Reach: Africa · Europe · Asia
 * - Primary CTA: Start Now (→ /contact)
 * - Secondary CTA: Explore Services
 *
 * Brand:
 * - Navy:  #0A1A36
 * - Gold:  #FFC72C
 * - Font:  Montserrat
 *
 * SEO/A11y/Perf:
 * - Single semantic <h1>
 * - next/image with priority + fetchPriority="high" (LCP element)
 * - sizes="100vw" responsive srcset
 * - Gradient overlay ensures WCAG AAA contrast
 * - prefers-reduced-motion disables animations
 */

const SCOPE_STATEMENTS = [
  "Strategic excellence meets innovative solutions in management consulting",
  "Helping organisations adapt, grow, and gain a competitive advantage",
  "From the boardroom to the global stage, Africa · Europe · Asia",
];

// Hero image, replace with your own asset in /public when available
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=85";

const HERO_IMAGE_ALT =
  "Business leaders in strategic discussion, the context in which GCSA Consulting partners with organisations to drive transformation";

const Hero = () => {
  const [statementIndex, setStatementIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || SCOPE_STATEMENTS.length <= 1) return;

    const id = setInterval(() => {
      setStatementIndex((i) => (i + 1) % SCOPE_STATEMENTS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[92vh] md:min-h-screen overflow-hidden bg-[#06122A]"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ── Background image ───────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />

        {/* Navy gradient overlay, matches flyer aesthetic */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(6,18,42,0.96) 0%, rgba(10,26,54,0.88) 35%, rgba(10,26,54,0.65) 65%, rgba(6,18,42,0.55) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom fade for nav contrast */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(6,18,42,0.5) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Decorative gold grid */}
        <svg
          className="absolute right-0 top-0 h-full w-1/2 opacity-[0.07] pointer-events-none hidden md:block"
          viewBox="0 0 600 800"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="goldgrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFC72C" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="600" height="800" fill="url(#goldgrid)" />
        </svg>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[92vh] md:min-h-screen flex items-center">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20 pt-28 md:pt-32 pb-12 md:pb-16 max-w-[1600px] mx-auto">
          <div className="max-w-5xl">
            {/* Scope statement / rotating tagline */}
            <div
              className="mb-6 md:mb-12 opacity-0 animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_200ms_forwards]"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-start gap-4 max-w-2xl">
                <span
                  className="shrink-0 inline-block w-10 h-px mt-3"
                  style={{ backgroundColor: "#FFC72C" }}
                  aria-hidden="true"
                />
                <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-[1.55] text-white/85 font-light">
                  {SCOPE_STATEMENTS[statementIndex]}
                </p>
              </div>
            </div>

            {/* Eyebrow */}
            <p className="text-[10.5px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-[#FFC72C] mb-5 opacity-0 animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_350ms_forwards]">
              GCSA Consulting · Business Consultants
            </p>

            {/* H1 - Taking Your Business to the Next Level */}
            <h1
              id="hero-heading"
              className="text-white font-extrabold leading-[0.98] tracking-[-0.02em] text-[42px] sm:text-[58px] md:text-[76px] lg:text-[92px] xl:text-[104px] opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_500ms_forwards]"
            >
              Taking Your Business
              <br className="hidden sm:block" /> to the{" "}
              <span
                className="relative inline-block"
                style={{ color: "#FFC72C" }}
              >
                Next Level
                <svg
                  className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-3 md:h-4"
                  viewBox="0 0 300 16"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10 Q 75 2, 150 8 T 298 6"
                    stroke="#FFC72C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            {/* Sub-headline */}
            <p className="mt-10 md:mt-14 max-w-2xl text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7] text-white/80 font-light opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_700ms_forwards]">
              We deploy our wealth of creative ideas to help businesses
              identify, acquire and deploy the key capabilities required to{" "}
              <span className="text-white font-medium">adapt, grow, gain competitive advantage,</span>{" "}
              defend a strategic position, or exit a crisis situation.
            </p>

            {/* CTAs */}
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3 opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_900ms_forwards]">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 md:px-9 py-4 md:py-[18px] rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[11.5px] md:text-[12px] font-bold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(255,199,44,0.55)] hover:shadow-[0_14px_36px_-8px_rgba(255,199,44,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06122A] focus-visible:ring-[#FFC72C] transition-all duration-300"
              >
                Start Now
                <FiArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/#services"
                className="group inline-flex items-center gap-2 px-7 md:px-9 py-4 md:py-[18px] rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/30 hover:border-[#FFC72C] text-[11.5px] md:text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06122A] focus-visible:ring-white/50 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>

            {/* Stat strip, global reach signal */}
            <div className="mt-14 md:mt-20 grid grid-cols-3 gap-4 md:gap-12 max-w-2xl border-t border-white/15 pt-8 opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_1100ms_forwards]">
              {[
                { value: "3", label: "Continents Served" },
                { value: "Public + Private", label: "Sectors" },
                { value: "Global", label: "Expertise" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-[22px] md:text-[28px] lg:text-[32px] font-extrabold text-[#FFC72C] leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-[10.5px] font-semibold tracking-[0.18em] uppercase text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll cue ──────────────────────────────────────── */}
        <div
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 text-white/50 opacity-0 animate-[heroReveal_800ms_ease-out_1300ms_forwards]"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.32em] uppercase font-semibold">Scroll</span>
          <span className="relative block w-px h-10 bg-white/30 overflow-hidden">
            <span
              className="absolute inset-x-0 top-0 h-4"
              style={{
                backgroundColor: "#FFC72C",
                animation: "scrollCue 2.2s cubic-bezier(0.4,0,0.2,1) infinite",
              }}
            />
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollCue {
          0% {
            transform: translateY(-100%);
          }
          60% {
            transform: translateY(260%);
          }
          100% {
            transform: translateY(260%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          section[aria-labelledby="hero-heading"] *[class*="animate-"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;