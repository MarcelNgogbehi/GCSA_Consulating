"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * Process — GCSA Consulting | How We Work
 *
 * Content adapted from gcsaconsulting.co.uk service offerings:
 *  Strategic Planning, Organizational Development, Digital Transformation,
 *  Change Management, Market Expansion, Performance Improvement.
 *
 * Reframed as a four-phase engagement methodology that runs through
 * every GCSA project — diagnostic before prescriptive.
 */

function useReveal(options = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      options
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const PHASES = [
  {
    phase: "Phase One",
    name: "Diagnose",
    title: "Understand the business before we prescribe a single intervention.",
    summary:
      "Stakeholder interviews, capability assessments, and a deep review of strategy, operations, and market context. We surface the underlying constraints — not just the symptoms.",
    metric: "01",
    metricLabel: "Discovery",
    duration: "2–4 weeks",
    quote:
      "Strategic planning begins with honest diagnosis. Most organisations mistake their symptoms for their disease — we separate the two before recommending anything.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Strategic discovery and diagnostic workshop session",
  },
  {
    phase: "Phase Two",
    name: "Design",
    title: "A bespoke roadmap engineered for your context.",
    summary:
      "We craft strategic plans, target operating models, and digital transformation roadmaps tailored to your sector, scale, and ambition — never templated, always engineered.",
    metric: "02",
    metricLabel: "Strategy & Architecture",
    duration: "3–6 weeks",
    quote:
      "A blueprint is the moment your organisation stops improvising and starts building with intent.",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Detailed planning and architectural design on whiteboard",
  },
  {
    phase: "Phase Three",
    name: "Deliver",
    title: "We walk with you as the change takes root.",
    summary:
      "Side-by-side implementation: change management, programme governance, capability transfer, and the leadership coaching that turns recommendations into operational reality.",
    metric: "03",
    metricLabel: "Implementation",
    duration: "3–12 months",
    quote:
      "Strategy only counts when it survives contact with Monday morning. Delivery is where we are most present.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Consultant working alongside client team during implementation",
  },
  {
    phase: "Phase Four",
    name: "Optimise",
    title: "Performance improvement that compounds over time.",
    summary:
      "Quarterly performance reviews, market expansion advisory, and the ongoing partnership that keeps your organisation matched to its ambition as conditions change.",
    metric: "04",
    metricLabel: "Continuous Value",
    duration: "Ongoing",
    quote:
      "What we build must outlive our engagement. Optimisation is how we make sure it does.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern city skyline at twilight representing scale and growth",
  },
];

const Process = () => {
  const [headerRef, headerVisible] = useReveal();
  const [bodyRef, bodyVisible] = useReveal();
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);

  const handleTabKey = (e) => {
    const n = PHASES.length;
    let nextIndex = null;
    if (e.key === "ArrowRight") nextIndex = (active + 1) % n;
    if (e.key === "ArrowLeft") nextIndex = (active - 1 + n) % n;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = n - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      setActive(nextIndex);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  const current = PHASES[active];

  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-[#0A1A36] text-white py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Ambient gold glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255,199,44,0.10), transparent 55%), radial-gradient(circle at 10% 85%, rgba(255,199,44,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mb-14 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            The GCSA Method
          </p>

          <h2
            id="process-heading"
            className={[
              "font-extrabold leading-[1.02] tracking-[-0.02em] text-white text-[40px] md:text-[58px] lg:text-[68px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            How we{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              work
            </span>{" "}
            with you.
          </h2>

          <p
            className={[
              "mt-6 md:mt-8 text-[15px] md:text-[17px] leading-[1.75] text-white/70 max-w-2xl transition-all duration-700 delay-200",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            Every engagement follows a four-phase rhythm — diagnostic before
            prescriptive, partnership over transaction. From strategic planning
            and organisational development to digital transformation and
            performance improvement, the rhythm is constant; the work is custom.
          </p>
        </div>

        {/* Tabs */}
        <div
          ref={bodyRef}
          className={[
            "border-t border-white/10 transition-all duration-700",
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <div role="tablist" aria-label="Engagement phases" className="flex flex-wrap gap-x-1 gap-y-0">
            {PHASES.map((p, i) => {
              const selected = active === i;
              return (
                <button
                  key={p.name}
                  ref={(el) => (tabsRef.current[i] = el)}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`phase-panel-${i}`}
                  id={`phase-tab-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={handleTabKey}
                  className="group relative px-5 md:px-7 py-5 md:py-6 text-left focus:outline-none"
                >
                  <span
                    className={[
                      "block text-[10px] font-bold tracking-[0.28em] uppercase transition-colors duration-300",
                      selected
                        ? "text-[#FFC72C]"
                        : "text-white/40 group-hover:text-white/70 group-focus-visible:text-white/90",
                    ].join(" ")}
                  >
                    {p.phase}
                  </span>
                  <span
                    className={[
                      "block mt-1.5 text-[15px] md:text-[17px] font-bold transition-colors duration-300",
                      selected
                        ? "text-white"
                        : "text-white/55 group-hover:text-white group-focus-visible:text-white",
                    ].join(" ")}
                  >
                    {p.name}
                  </span>

                  <span
                    className={[
                      "absolute left-0 right-0 -top-px h-[3px] origin-center transition-transform duration-500 ease-out",
                      selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                    ].join(" ")}
                    style={{ backgroundColor: "#FFC72C" }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`phase-panel-${active}`}
          aria-labelledby={`phase-tab-${active}`}
          className="mt-10 md:mt-16"
        >
          <div
            key={active}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start animate-[caseFade_600ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
          >
            {/* Image */}
            <div className="lg:col-span-6 relative group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#06122A]">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(10,26,54,0.1) 50%, rgba(10,26,54,0.6) 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Duration pill */}
                <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#FFC72C" }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/95">
                      {current.duration}
                    </span>
                  </div>
                </div>

                {/* Decorative gold corner */}
                <div
                  className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFC72C 0%, #FFC72C 50%, transparent 50%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 lg:pl-4 lg:pt-4">
              {/* Step number metric */}
              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-white/10">
                <span
                  className="font-extrabold tracking-[-0.04em] leading-none text-[64px] md:text-[88px] lg:text-[104px]"
                  style={{ color: "#FFC72C" }}
                >
                  {current.metric}
                </span>
                <span className="text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-white/60 font-bold pb-2">
                  {current.metricLabel}
                </span>
              </div>

              <h3 className="font-extrabold leading-[1.1] tracking-[-0.01em] text-white text-[26px] md:text-[34px] lg:text-[40px]">
                {current.title}
              </h3>

              <p className="mt-5 md:mt-6 text-[15px] md:text-[16px] leading-[1.75] text-white/75 max-w-xl">
                {current.summary}
              </p>

              {/* Pull quote */}
              <figure className="relative mt-10 md:mt-12 pl-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 text-[64px] leading-[0.8] italic font-serif"
                  style={{ color: "#FFC72C" }}
                >
                  &ldquo;
                </span>
                <blockquote className="text-[16px] md:text-[19px] lg:text-[21px] leading-[1.5] italic font-light text-white/90 max-w-xl">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-4 text-[10.5px] font-bold tracking-[0.24em] uppercase text-white/50">
                  GCSA · Principle of the Phase
                </figcaption>
              </figure>

              {/* CTA */}
              <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[11.5px] font-bold tracking-[0.18em] uppercase shadow-[0_8px_24px_-8px_rgba(255,199,44,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(255,199,44,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1A36] focus-visible:ring-[#FFC72C] transition-all duration-300"
                >
                  Begin with a discovery call
                  <FiArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-[11.5px] font-bold tracking-[0.18em] uppercase text-white/70 hover:text-[#FFC72C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm transition-colors duration-200"
                >
                  <span className="relative">
                    Request a proposal
                    <span
                      className="absolute left-0 right-0 -bottom-0.5 h-px origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                      style={{ backgroundColor: "#FFC72C" }}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes caseFade {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          section[aria-labelledby="process-heading"] *[class*="animate-"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;