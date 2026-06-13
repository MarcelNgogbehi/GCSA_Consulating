"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiShield,
  FiServer,
  FiLayers,
  FiTrendingUp,
  FiCpu,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Services, GCSA Consulting UK LTD
 *
 * Full-detail services page expanding the homepage Services section.
 * Sections:
 *  1. Page hero
 *  2. Practice overview (intro)
 *  3. Five service pillars (deep-dive cards with what's included)
 *  4. Sectors served
 *  5. The GCSA Method (process recap)
 *  6. CTA strip
 */

function useReveal(options = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }) {
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

// ═══════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════
const SERVICES = [
  {
    number: "01",
    slug: "corporate-governance",
    title: "Corporate Governance",
    Icon: FiShield,
    summary:
      "Frameworks, policies, and board level advisory that strengthen accountability and protect long term value.",
    body: "We help organisations design and operate governance structures that satisfy regulators, reassure investors, and align leadership with strategic intent. From board effectiveness reviews to enterprise risk frameworks and ethics programmes, our work strengthens the foundation on which every other decision rests.",
    deliverables: [
      "Board effectiveness reviews",
      "Governance frameworks and charters",
      "Enterprise risk and compliance",
      "Ethics, conduct, and policy design",
      "Regulatory advisory",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    slug: "infrastructure-consulting",
    title: "Infrastructure Consulting",
    Icon: FiServer,
    summary:
      "Plan, design, and deliver the physical and digital infrastructure that underpins resilient, scalable operations.",
    body: "From feasibility through deployment, our consultants partner with public and private institutions to specify, procure, and govern infrastructure programmes that deliver on time and within budget. Whether it's data centre strategy, network modernisation, or capital-project advisory, we make complex builds run smoothly.",
    deliverables: [
      "Infrastructure strategy and master planning",
      "Capital-project advisory",
      "Vendor selection and procurement",
      "Programme governance and assurance",
      "Operational readiness",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    slug: "enterprise-architecture",
    title: "Enterprise Architecture",
    Icon: FiLayers,
    summary:
      "Align business, data, application, and technology layers into one coherent operating model.",
    body: "We translate strategy into structure, designing target architectures and governance frameworks that make complex enterprises easier to run and faster to evolve. Our architects bring industry frameworks (TOGAF, Zachman) plus the practical judgement to apply them well.",
    deliverables: [
      "Target operating-model design",
      "Business, data, application, and technology architectures",
      "Architecture governance and review boards",
      "Capability roadmaps",
      "Architecture upskilling for in house teams",
    ],
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    slug: "strategy-management",
    title: "Strategy Management",
    Icon: FiTrendingUp,
    summary:
      "Craft and execute strategy with the discipline to translate vision into measurable outcomes.",
    body: "Strategy fails not from lack of ambition but from a lack of operating cadence. We help leadership teams write strategies that survive contact with reality, and build the planning, performance, and review rhythms that keep them on track every quarter.",
    deliverables: [
      "Strategic planning and refresh cycles",
      "Market entry and expansion advisory",
      "OKRs, KPIs, and performance scorecards",
      "Quarterly business reviews",
      "Strategy execution coaching",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    slug: "technology-advisory",
    title: "Technology Advisory",
    Icon: FiCpu,
    summary:
      "Independent counsel on digital transformation, platform selection, and emerging technologies.",
    body: "We help leadership teams make confident technology decisions, from cloud strategy and data platforms to enterprise applications, integration, and security posture. Our advice is vendor-independent and grounded in the operating reality of your sector.",
    deliverables: [
      "Digital transformation strategy",
      "Cloud and platform selection",
      "Data and AI roadmaps",
      "Enterprise software selection",
      "Cybersecurity posture review",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
  },
];

const SECTORS = [
  "Financial Services",
  "Public Sector & Government",
  "Telecommunications",
  "Energy & Utilities",
  "Healthcare",
  "Manufacturing",
  "Retail & Consumer",
  "Education",
  "Non-Profit",
];

const PHASES = [
  {
    metric: "01",
    name: "Diagnose",
    copy: "Stakeholder interviews, capability assessments, and a deep review of strategy, operations, and market context.",
  },
  {
    metric: "02",
    name: "Design",
    copy: "Strategic plans, target operating models, and roadmaps engineered for your sector, scale, and ambition.",
  },
  {
    metric: "03",
    name: "Deliver",
    copy: "Side-by-side implementation: change management, programme governance, and capability transfer.",
  },
  {
    metric: "04",
    name: "Optimise",
    copy: "Quarterly performance reviews and the ongoing partnership that keeps your organisation matched to its ambition.",
  },
];

const SERVICES_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.gcsaconsulting.co.uk/services/#webpage",
  url: "https://www.gcsaconsulting.co.uk/services",
  name: "GCSA Consulting Services",
  description:
    "Five disciplines of management consulting for public and private institutions: corporate governance, infrastructure, enterprise architecture, strategy management, and technology advisory.",
  isPartOf: { "@id": "https://www.gcsaconsulting.co.uk/#website" },
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
const ServicesPage = () => {
  return (
    <>
      <Script
        id="ld-json-services"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <PageHero />
        <Overview />
        <ServicePillars />
        <Sectors />
        <Method />
        <CtaStrip />
      </main>

      <Footer />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Page hero
// ═══════════════════════════════════════════════════════════════════════
const PageHero = () => {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative bg-[#0A1A36] text-white overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
    >
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 15%, rgba(255,199,44,0.18), transparent 50%), radial-gradient(circle at 8% 90%, rgba(255,199,44,0.06), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-[#FFC72C] transition-colors">Home</Link>
          <span aria-hidden="true">·</span>
          <span className="text-[#FFC72C]">Services</span>
        </nav>

        <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
          <span className="inline-block w-12 h-px" style={{ backgroundColor: "#FFC72C" }} />
          GCSA Services
        </p>

        <h1
          id="services-hero-heading"
          className="font-extrabold leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] max-w-5xl"
        >
          Five disciplines.{" "}
          <span className="font-light italic" style={{ color: "#FFC72C" }}>One</span>{" "}
          standard.
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          GCSA provides a range of management consulting services in both
          public and private institutions, across diverse industries and
          sectors. Every engagement is tailored, because every business is
          unique.
        </p>

        <div className="mt-10 md:mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 md:px-9 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(255,199,44,0.55)] transition-all duration-300"
          >
            Discuss your project
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#pillars"
            className="group inline-flex items-center gap-2 px-7 md:px-9 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-[#FFC72C] text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
          >
            Explore the practice
          </Link>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Overview
// ═══════════════════════════════════════════════════════════════════════
const Overview = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      aria-labelledby="overview-heading"
      ref={ref}
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Overview
            </p>
            <h2
              id="overview-heading"
              className={[
                "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[32px] md:text-[42px] lg:text-[48px] transition-all duration-[900ms] delay-100",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              Tailored consulting,{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                rigorously
              </span>{" "}
              applied.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-[#0A1A36]/80">
            <p>
              We deploy our wealth of creative ideas to help businesses
              identify, acquire, and deploy the key capabilities required to
              adapt, grow, gain competitive advantage, defend a strategic
              position, or exit a crisis situation.
            </p>
            <p>
              Our consultants operate across five disciplines that, together,
              cover the operating reality of a modern enterprise, from the
              boardroom (governance) to the engine room (infrastructure and
              technology). Every engagement begins with diagnosis and ends with
              measurable outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Service pillars (5 deep cards)
// ═══════════════════════════════════════════════════════════════════════
const ServicePillars = () => {
  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-36"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6">
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            The Practice
          </p>
          <h2
            id="pillars-heading"
            className="font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px] lg:text-[56px]"
          >
            Five service{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              pillars
            </span>
            .
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {SERVICES.map((s, i) => (
            <ServiceBlock key={s.slug} service={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceBlock = ({ service, reverse }) => {
  const [ref, visible] = useReveal();
  const { number, slug, title, Icon, summary, body, deliverables, image } = service;

  return (
    <article
      ref={ref}
      id={slug}
      className={[
        "scroll-mt-24 transition-all duration-[900ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      ].join(" ")}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        {/* Image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#0A1A36] group">
            <Image
              src={image}
              alt={`${title}, GCSA Consulting service`}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10,26,54,0.05) 50%, rgba(10,26,54,0.55) 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #FFC72C 0%, #FFC72C 50%, transparent 50%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/95">
                Pillar {number}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-7 lg:pl-2">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-full"
              style={{ backgroundColor: "#FFC72C" }}
            >
              <Icon className="w-5 h-5 text-[#0A1A36]" strokeWidth={2.2} />
            </span>
            <span
              className="text-[28px] md:text-[36px] font-extrabold leading-none"
              style={{ color: "#FFC72C" }}
            >
              {number}
            </span>
          </div>

          <h3 className="font-extrabold leading-[1.05] tracking-[-0.015em] text-[#0A1A36] text-[30px] md:text-[40px] lg:text-[46px] mb-4">
            {title}
          </h3>
          <p className="text-[16px] md:text-[18px] leading-[1.55] text-[#0A1A36]/85 font-light italic mb-6 max-w-2xl">
            {summary}
          </p>
          <p className="text-[14.5px] md:text-[15px] leading-[1.8] text-[#0A1A36]/75 max-w-xl mb-8">
            {body}
          </p>

          <div className="bg-white border border-[#0A1A36]/10 rounded-sm p-6 md:p-7 mb-8">
            <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-4">
              What's included
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-[13.5px] md:text-[14px] text-[#0A1A36]/85">
                  <FiCheck className="shrink-0 mt-0.5 w-4 h-4" style={{ color: "#FFC72C" }} strokeWidth={3} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`#${slug}`}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A1A36] hover:bg-[#06122A] text-white text-[11px] font-extrabold tracking-[0.18em] uppercase transition-all duration-300"
            >
              Explore {title}
              <FiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#0A1A36] hover:text-[#FFC72C] transition-colors"
            >
              <span className="relative">
                Talk to a consultant
                <span
                  className="absolute left-0 right-0 -bottom-0.5 h-px scale-x-100 origin-left"
                  style={{ backgroundColor: "#FFC72C" }}
                  aria-hidden="true"
                />
              </span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Sectors
// ═══════════════════════════════════════════════════════════════════════
const Sectors = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      aria-labelledby="sectors-heading"
      className="relative bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6">
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Sectors Served
            </p>
            <h2
              id="sectors-heading"
              className="font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[32px] md:text-[42px] lg:text-[48px]"
            >
              Cross-industry{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                expertise
              </span>
              .
            </h2>
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#0A1A36]/75 max-w-md">
              GCSA consultants operate across both public and private
              institutions in a wide range of industries. The frameworks are
              shared; the application is sector-specific.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SECTORS.map((s, i) => (
                <div
                  key={s}
                  className={[
                    "group relative px-5 py-4 bg-[#FBF8F1] border border-[#0A1A36]/10 rounded-sm hover:border-[#FFC72C] hover:bg-white transition-all duration-300 cursor-default",
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  ].join(" ")}
                  style={{ transitionDelay: visible ? `${60 * i}ms` : "0ms" }}
                >
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: "#FFC72C" }}
                    aria-hidden="true"
                  />
                  <span className="text-[12.5px] md:text-[13px] font-bold text-[#0A1A36]">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// The GCSA Method
// ═══════════════════════════════════════════════════════════════════════
const Method = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      aria-labelledby="method-heading"
      className="relative bg-[#0A1A36] text-white py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255,199,44,0.10), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            The GCSA Method
          </p>
          <h2
            id="method-heading"
            className="font-extrabold leading-[1.02] tracking-[-0.02em] text-white text-[36px] md:text-[48px] lg:text-[56px]"
          >
            Diagnose. Design. Deliver.{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              Optimise
            </span>
            .
          </h2>
          <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-white/70 max-w-2xl">
            Whatever the pillar, the engagement rhythm is constant, diagnostic
            before prescriptive, partnership over transaction.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PHASES.map((p, i) => (
            <li
              key={p.metric}
              className={[
                "relative bg-white/[0.03] border border-white/10 hover:border-[#FFC72C]/50 rounded-sm p-7 md:p-8 transition-all duration-500",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${130 * i}ms` : "0ms" }}
            >
              <span
                className="text-[44px] md:text-[52px] font-extrabold leading-none"
                style={{ color: "#FFC72C" }}
              >
                {p.metric}
              </span>
              <h3 className="mt-3 font-extrabold tracking-[-0.01em] text-white text-[20px] md:text-[22px] mb-3">
                {p.name}
              </h3>
              <p className="text-[13px] md:text-[13.5px] leading-[1.7] text-white/70">
                {p.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CTA strip
// ═══════════════════════════════════════════════════════════════════════
const CtaStrip = () => {
  return (
    <section className="relative bg-[#06122A] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 50%, rgba(255,199,44,0.18), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-4">
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Begin the conversation
            </p>
            <h2 className="font-extrabold leading-[1.02] tracking-[-0.02em] text-white text-[32px] md:text-[44px] lg:text-[52px]">
              Tell us about your{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                ambition
              </span>
              .
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(255,199,44,0.55)] transition-all duration-300"
            >
              Schedule a Consultation
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/training"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
            >
              View Training
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;