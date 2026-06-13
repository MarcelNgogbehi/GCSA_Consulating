"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * Services, GCSA Consulting | Five Service Pillars
 *
 * Content (per gcsaconsulting.co.uk):
 *   01 Corporate Governance
 *   02 Infrastructure Consulting
 *   03 Enterprise Architecture
 *   04 Strategy Management
 *   05 Technology Advisory
 *
 * "GCSA provides a range of management consulting services in both Public
 *  and Private institutions across various industries and sectors."
 *
 * Layout: white bg, sticky left positioning statement, expandable rows.
 *
 * Brand:
 * - Navy:  #0A1A36
 * - Gold:  #FFC72C
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

const SERVICES = [
  {
    number: "01",
    title: "Corporate Governance",
    summary:
      "Frameworks, policies, and board level advisory that strengthen accountability and protect long term value.",
    detail:
      "We help organisations design and operate governance structures that satisfy regulators, reassure investors, and align leadership with strategic intent.",
    href: "/services#corporate-governance",
  },
  {
    number: "02",
    title: "Infrastructure Consulting",
    summary:
      "Plan, design, and deliver the physical and digital infrastructure that underpins resilient, scalable operations.",
    detail:
      "From feasibility through deployment, our consultants partner with public and private institutions to specify, procure, and govern infrastructure programmes that deliver on time and within budget.",
    href: "/services#infrastructure-consulting",
  },
  {
    number: "03",
    title: "Enterprise Architecture",
    summary:
      "Align business, data, application, and technology layers into one coherent operating model.",
    detail:
      "We translate strategy into structure, designing target architectures and governance frameworks that make complex enterprises easier to run and faster to evolve.",
    href: "/services#enterprise-architecture",
  },
  {
    number: "04",
    title: "Strategy Management",
    summary:
      "Craft and execute strategy with the discipline to translate vision into measurable outcomes.",
    detail:
      "Strategic planning, market entry, performance measurement, and the operating cadence required to keep the strategy on track every quarter.",
    href: "/services#strategy-management",
  },
  {
    number: "05",
    title: "Technology Advisory",
    summary:
      "Independent counsel on digital transformation, platform selection, and the adoption of emerging technologies.",
    detail:
      "We help leadership teams make confident technology decisions, from cloud strategy and data platforms to enterprise applications and security posture.",
    href: "/services#technology-advisory",
  },
];

const Services = () => {
  const [headerRef, headerVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-white py-20 md:py-28 lg:py-36"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Subtle navy gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(10,26,54,0.6), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: sticky positioning */}
          <div ref={headerRef} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              GCSA Services
            </p>

            <h2
              id="services-heading"
              className={[
                "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[40px] md:text-[52px] lg:text-[60px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              ].join(" ")}
            >
              Five disciplines.{" "}
              <span className="font-light italic relative" style={{ color: "#FFC72C" }}>
                One
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1"
                  style={{ backgroundColor: "#FFC72C", opacity: 0.3 }}
                />
              </span>{" "}
              standard of excellence.
            </h2>

            <p
              className={[
                "mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.75] text-[#0A1A36]/75 max-w-md transition-all duration-700 delay-200",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              GCSA provides a range of management consulting services in both
              public and private institutions, across diverse industries and
              sectors. Every engagement is tailored, because every business
              is unique.
            </p>

            <div
              className={[
                "mt-8 md:mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-300",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase text-[#0A1A36] hover:text-[#FFC72C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm transition-colors duration-200"
              >
                <span className="relative">
                  Discuss your project
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-100 transition-transform duration-300"
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

            {/* Sector pill */}
            <div className="mt-10 md:mt-14 inline-flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1A36]/[0.04] border border-[#0A1A36]/10 text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#0A1A36]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" />
                Public Sector
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1A36]/[0.04] border border-[#0A1A36]/10 text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#0A1A36]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" />
                Private Enterprise
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1A36]/[0.04] border border-[#0A1A36]/10 text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#0A1A36]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" />
                Cross-Industry
              </span>
            </div>
          </div>

          {/* Right: services list */}
          <div ref={listRef} className="lg:col-span-7">
            <ul className="divide-y divide-[#0A1A36]/15 border-t border-[#0A1A36]/15">
              {SERVICES.map((s, i) => (
                <ServiceRow key={s.number} service={s} index={i} visible={listVisible} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceRow = ({ service, index, visible }) => {
  const { number, title, summary, detail, href } = service;

  return (
    <li
      className={[
        "group transition-all duration-[700ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${120 + index * 80}ms` : "0ms" }}
    >
      <Link href={href} className="block relative py-7 md:py-9 focus:outline-none">
        <div className="flex items-start gap-6 md:gap-10">
          <span
            className="shrink-0 text-[13px] font-extrabold tracking-[0.18em] pt-1 md:pt-2 transition-colors duration-300 min-w-[28px]"
            style={{ color: "#FFC72C" }}
            aria-hidden="true"
          >
            {number}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold leading-[1.1] tracking-[-0.01em] text-[#0A1A36] text-[24px] md:text-[30px] lg:text-[34px] transition-transform duration-500 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1">
              {title}
            </h3>
            <p className="mt-3 text-[14.5px] md:text-[15px] leading-[1.65] text-[#0A1A36]/70 max-w-xl">
              {summary}
            </p>
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <p className="mt-4 text-[13.5px] leading-[1.7] text-[#0A1A36]/55 max-w-xl italic">
                  {detail}
                </p>
              </div>
            </div>
          </div>

          <span
            className="shrink-0 self-start mt-2 md:mt-3 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-[#0A1A36]/20 text-[#0A1A36] transition-all duration-500 ease-out group-hover:bg-[#FFC72C] group-hover:border-[#FFC72C] group-hover:text-[#0A1A36] group-focus-visible:bg-[#FFC72C] group-focus-visible:border-[#FFC72C]"
            aria-hidden="true"
          >
            <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
          </span>
        </div>

        <span
          className="absolute left-0 right-0 -bottom-px h-[2px] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[600ms] ease-out"
          style={{ backgroundColor: "#FFC72C" }}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
};

export default Services;