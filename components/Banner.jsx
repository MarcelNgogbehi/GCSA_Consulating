"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * GlobalReach, GCSA Consulting | Three-Continent Coverage
 *
 * NEW SECTION on the homepage. The original site mentions:
 * "Whether you're a startup aiming to disrupt the market or an
 *  established enterprise seeking to explore new geographic locations
 *  in Africa, Europe and Asia..."
 *
 * This section makes that explicit, three continents, one HQ, one
 * standard of work.
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

const REGIONS = [

  {
    code: "01",
    name: "Europe",
    description: "Our sole office is headquartered in London, from which we advise regulated industries, scale-ups, and established enterprises across the UK, EU, Africa, and Asia.",
    keywords: ["London HQ", "Regulated industries", "Governance", "Africa", "Europe", "Asia"],
  },
];

const GlobalReach = () => {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section
      id="global-reach"
      aria-labelledby="reach-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 md:mb-20"
        >
          <div className="lg:col-span-7">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Global Reach
            </p>
            <h2
              id="reach-heading"
              className={[
                "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[40px] md:text-[54px] lg:text-[64px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              One office.{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                Global
              </span>{" "}
              impact.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p
              className={[
                "text-[15px] md:text-[16px] leading-[1.75] text-[#0A1A36]/75 transition-all duration-700 delay-200",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              Whether you&rsquo;re a startup aiming to disrupt the market or an
              established enterprise seeking to explore new geographic locations
              in Africa, Europe and Asia, or you want to elevate your
              performance, GCSA is your trusted partner for strategic
              excellence and business transformation.
              <br /><br />
              Explore the possibilities with us. Let&rsquo;s redefine success, together.
            </p>
            <Link
              href="/contact"
              className="mt-6 group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase text-[#0A1A36] hover:text-[#FFC72C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm transition-colors duration-200"
            >
              <span className="relative">
                Discuss your market
                <span
                  className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-100"
                  style={{ backgroundColor: "#FFC72C" }}
                  aria-hidden="true"
                />
              </span>
              <FiArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Single office card */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:gap-8">
          {REGIONS.map((r, i) => (
            <RegionCard key={r.code} region={r} index={i} visible={gridVisible} />
          ))}
        </div>

        {/* Bottom HQ strip */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8 bg-[#0A1A36] rounded-sm">
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-full"
              style={{ backgroundColor: "#FFC72C" }}
              aria-hidden="true"
            >
              <svg className="w-5 h-5 text-[#0A1A36]" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9" r="2.5" fill="#0A1A36" />
              </svg>
            </span>
            <div>
              <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-1">
                London Headquarters
              </p>
              <p className="text-[14px] md:text-[15px] font-bold text-white">
                71-75 Shelton Street, Covent Garden, London WC2H 9JQ
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[11px] font-extrabold tracking-[0.18em] uppercase transition-all duration-300 self-start md:self-auto"
          >
            Visit our office
            <FiArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

const RegionCard = ({ region, index, visible }) => {
  const { code, name, description, keywords } = region;
  return (
    <article
      className={[
        "group relative bg-white p-7 md:p-10 lg:p-12 rounded-sm border border-[#0A1A36]/10 hover:border-[#FFC72C] hover:-translate-y-1 transition-all duration-500 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${140 * index}ms` : "0ms" }}
    >
      {/* Top accent strip */}
      <span
        className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
        style={{ backgroundColor: "#FFC72C" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="flex items-baseline justify-between mb-6">
            <span
              className="text-[36px] md:text-[44px] font-extrabold leading-none"
              style={{ color: "#FFC72C" }}
            >
              {code}
            </span>
            <span className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#0A1A36]/40">
              Region
            </span>
          </div>

          <h3 className="font-extrabold leading-[1.1] tracking-[-0.01em] text-[#0A1A36] text-[28px] md:text-[34px] mb-4">
            {name}
          </h3>
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#0A1A36]/70 mb-6">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 pt-5 border-t border-[#0A1A36]/10">
            {keywords.map((k) => (
              <span
                key={k}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A1A36]/[0.04] text-[10.5px] font-semibold tracking-[0.06em] uppercase text-[#0A1A36]/65"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default GlobalReach;