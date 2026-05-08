"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { FiArrowRight, FiArrowUpRight, FiLinkedin } from "react-icons/fi";
import { LuTarget, LuLightbulb, LuHandshake, LuAward } from "react-icons/lu";
import { assets } from "@/assets/assets";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * About Us — GCSA Consulting UK LTD
 *
 * Full editorial page expanding the homepage About section:
 *  1. Page hero
 *  2. Founding story
 *  3. Mission · Vision · Values
 *  4. Differentiators (4 pillars)
 *  5. Milestones / journey timeline
 *  6. Team grid (4 members)
 *  7. CTA strip → /contact
 */

// ═══════════════════════════════════════════════════════════════════════
// Reveal-on-scroll hook
// ═══════════════════════════════════════════════════════════════════════
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
const VALUES = [
  {
    Icon: LuTarget,
    title: "Excellence",
    copy: "Every deliverable held to a single, uncompromising standard — from the first conversation to long after the engagement closes.",
  },
  {
    Icon: LuLightbulb,
    title: "Innovation",
    copy: "We don't recycle templates. Every solution is engineered for the client's specific context, sector, and ambition.",
  },
  {
    Icon: LuHandshake,
    title: "Partnership",
    copy: "Consulting is collaborative, not transactional. We work alongside your team — never above them.",
  },
  {
    Icon: LuAward,
    title: "Integrity",
    copy: "Independent counsel, candid advice, and the discipline to recommend what's right rather than what's easy.",
  },
];

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Tailored Solutions",
    copy: "Every business is unique. We take the time to understand your specific challenges and goals, delivering customised strategies that fit your organisation's DNA.",
  },
  {
    number: "02",
    title: "Innovation at the Core",
    copy: "We don't just solve problems; we innovate. Our consultants bring fresh perspectives and creative thinking, ensuring you not only adapt to change but thrive in it.",
  },
  {
    number: "03",
    title: "Collaborative Approach",
    copy: "We work hand-in-hand with your team, fostering a dynamic partnership that leverages collective expertise and drives sustainable success.",
  },
  {
    number: "04",
    title: "Proven Expertise",
    copy: "Backed by seasoned professionals with diverse industry backgrounds, we bring decades of experience navigating complex challenges and delivering results worldwide.",
  },
];

const MILESTONES = [
  {
    year: "Founding",
    title: "Born from a vision",
    copy: "GCSA was founded with a passion for transforming businesses — a consulting firm that prioritises partnership at every level.",
  },
  {
    year: "Phase I",
    title: "London headquarters",
    copy: "Established our HQ in Covent Garden, London, building the foundation for a globally-minded UK practice.",
  },
  {
    year: "Phase II",
    title: "Cross-continent expansion",
    copy: "Extended our consulting practice across Africa, Europe, and Asia — supporting clients in market entry, governance, and transformation.",
  },
  {
    year: "Today",
    title: "Five-pillar practice",
    copy: "Operating across Corporate Governance, Infrastructure, Enterprise Architecture, Strategy Management, and Technology Advisory — plus our flagship training programmes.",
  },
];

const TEAM = [
  {
    name: "Marcel Ngogbehei",
    role: "CEO",
    bio: "Founder and chief strategist. Leads GCSA's global consulting practice with a focus on transformation, governance, and growth.",
    image: assets.Mr_Marcel,
    linkedin: "#",
  },
  {
    name: "Don Francis",
    role: "Tech Lead",
    bio: "Heads the Technology Advisory and Enterprise Architecture practices. Specialist in cloud strategy, integration, and digital transformation.",
    image: assets.GCSA3,
    linkedin: "#",
  },
  {
    name: "Alexa Young",
    role: "Product Manager",
    bio: "Drives product strategy and delivery across client engagements. Expert in roadmapping, market expansion, and stakeholder alignment.",
    image: assets.GCSA2,
    linkedin: "#",
  },
  {
    name: "Robert Rose",
    role: "Product Designer",
    bio: "Leads design thinking and customer-experience workstreams. Translates strategy into elegant, usable, business-ready interfaces.",
    image: assets.GCSA1,
    linkedin: "#",
  },
];

const ABOUT_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.gcsaconsulting.co.uk/about/#webpage",
  url: "https://www.gcsaconsulting.co.uk/about",
  name: "About GCSA Consulting",
  description:
    "Founded with a passion for transforming businesses. GCSA Consulting is a UK-headquartered management consulting firm serving Africa, Europe, and Asia.",
  isPartOf: { "@id": "https://www.gcsaconsulting.co.uk/#website" },
  about: { "@id": "https://www.gcsaconsulting.co.uk/#organization" },
  inLanguage: "en-GB",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
const AboutPage = () => {
  return (
    <>
      <Script
        id="ld-json-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_LD) }}
      />

      <Navbar />

      <main
        id="main-content"
        role="main"
        className="bg-white"
        style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      >
        <PageHero />
        <FoundingStory />
        <MissionVisionValues />
        <Differentiators />
        <Journey />
        <TeamSection />
        <CtaStrip />
      </main>

      <Footer />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 1. Page hero — navy band with breadcrumb
// ═══════════════════════════════════════════════════════════════════════
const PageHero = () => {
  return (
    <section
      aria-labelledby="about-hero-heading"
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
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-[#FFC72C] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">·</span>
          <span className="text-[#FFC72C]">About</span>
        </nav>

        <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6">
          <span className="inline-block w-12 h-px" style={{ backgroundColor: "#FFC72C" }} />
          About GCSA
        </p>

        <h1
          id="about-hero-heading"
          className="font-extrabold leading-[0.98] tracking-[-0.02em] text-white text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] max-w-5xl"
        >
          Strategic excellence meets{" "}
          <span className="font-light italic" style={{ color: "#FFC72C" }}>
            innovation
          </span>
          .
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-white/75 font-light">
          We are a UK-headquartered management consulting firm helping
          organisations across Africa, Europe, and Asia identify, acquire,
          and deploy the capabilities required to adapt, grow, and lead.
        </p>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 2. Founding story
// ═══════════════════════════════════════════════════════════════════════
const FoundingStory = () => {
  const [headerRef, headerVisible] = useReveal();
  const [bodyRef, bodyVisible] = useReveal();

  return (
    <section
      aria-labelledby="story-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            Our Story
          </p>
          <h2
            id="story-heading"
            className={[
              "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            Born from a vision to{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              redefine
            </span>{" "}
            consulting.
          </h2>
        </div>

        <div
          ref={bodyRef}
          className={[
            "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start transition-all duration-[900ms] ease-out",
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-sm bg-[#0A1A36] group">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=85"
                  alt="GCSA leadership in strategic discussion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-30"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,26,54,0.5) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>
              <div
                className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(225deg, #FFC72C 0%, #FFC72C 50%, transparent 50%)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-4 lg:pt-4">
            <p className="font-light leading-[1.18] tracking-[-0.01em] text-[#0A1A36] text-[24px] md:text-[30px] lg:text-[34px] max-w-2xl">
              A consulting firm built on{" "}
              <span className="italic font-medium" style={{ color: "#FFC72C" }}>
                collaboration, innovation
              </span>
              , and the relentless pursuit of client success.
            </p>

            <div className="mt-6 md:mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-[#0A1A36]/80 max-w-xl">
              <p>
                Founded with a passion for transforming businesses, GCSA was
                born from a vision to redefine how organisations approach
                challenges and embrace opportunities. Our journey began with a
                simple yet powerful idea: to create a consulting firm that not
                only delivers exceptional results but also prioritises
                partnership at every level.
              </p>
              <p>
                Whether you're a startup aiming to disrupt the market, or an
                established enterprise exploring{" "}
                <em className="not-italic font-bold text-[#0A1A36]">
                  new geographies in Africa, Europe, and Asia
                </em>
                , GCSA is your trusted partner for strategic excellence and
                business transformation.
              </p>
              <p>
                Today, our consultants operate across five disciplines —
                Corporate Governance, Infrastructure, Enterprise Architecture,
                Strategy Management, and Technology Advisory — alongside our
                flagship training programmes. The work is custom; the standard
                is constant.
              </p>
            </div>

            <figure
              className="relative mt-10 md:mt-12 pl-8 border-l-[3px]"
              style={{ borderLeftColor: "#FFC72C" }}
            >
              <span
                aria-hidden="true"
                className="absolute -left-[8px] top-0 w-4 h-4 rounded-full"
                style={{ backgroundColor: "#FFC72C" }}
              />
              <blockquote className="text-[18px] md:text-[22px] leading-[1.45] italic font-light text-[#0A1A36] max-w-xl">
                Explore the possibilities with us. Let's redefine success,
                together.
              </blockquote>
              <figcaption className="mt-4 text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#0A1A36]/60">
                GCSA Consulting · Founding Principle
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 3. Mission · Vision · Values
// ═══════════════════════════════════════════════════════════════════════
const MissionVisionValues = () => {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section
      aria-labelledby="mvv-heading"
      className="relative bg-white py-20 md:py-28 lg:py-36"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            Mission · Vision · Values
          </p>
          <h2
            id="mvv-heading"
            className={[
              "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            What we{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              stand for
            </span>
            .
          </h2>
        </div>

        {/* Mission + Vision split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          <article className="relative bg-[#0A1A36] text-white p-8 md:p-12 rounded-sm overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: "#FFC72C" }}
              aria-hidden="true"
            />
            <p className="text-[10.5px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-5">
              Our Mission
            </p>
            <p className="text-[20px] md:text-[24px] lg:text-[26px] font-light leading-[1.4] tracking-[-0.01em]">
              To deploy our wealth of creative ideas in helping businesses
              identify, acquire, and deploy the key capabilities required to{" "}
              <span className="italic font-medium" style={{ color: "#FFC72C" }}>
                adapt, grow, and lead
              </span>
              .
            </p>
          </article>

          <article className="relative bg-[#FBF8F1] text-[#0A1A36] p-8 md:p-12 rounded-sm border border-[#0A1A36]/10 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: "#FFC72C" }}
              aria-hidden="true"
            />
            <p className="text-[10.5px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-5">
              Our Vision
            </p>
            <p className="text-[20px] md:text-[24px] lg:text-[26px] font-light leading-[1.4] tracking-[-0.01em]">
              To be the consulting partner of choice for organisations
              transforming themselves across{" "}
              <span className="italic font-medium" style={{ color: "#FFC72C" }}>
                Africa, Europe, and Asia
              </span>{" "}
              — delivering strategic excellence in every engagement.
            </p>
          </article>
        </div>

        {/* Values grid */}
        <div ref={gridRef} className="border-t border-[#0A1A36]/15 pt-12 md:pt-16">
          <p className="text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-10">
            <span
              className="inline-block w-10 h-px mr-3 align-middle"
              style={{ backgroundColor: "#FFC72C" }}
            />
            Our Values
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                className={[
                  "group relative p-7 md:p-8 bg-white border border-[#0A1A36]/10 rounded-sm hover:border-[#FFC72C] hover:-translate-y-1 transition-all duration-500 ease-out",
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                ].join(" ")}
                style={{ transitionDelay: gridVisible ? `${130 * i}ms` : "0ms" }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ backgroundColor: "#FFC72C" }}
                  aria-hidden="true"
                />
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5 transition-colors duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#FFC72C" }}
                >
                  <v.Icon className="w-5 h-5 text-[#0A1A36]" strokeWidth={2.2} />
                </div>
                <h3 className="font-extrabold tracking-[-0.01em] text-[#0A1A36] text-[20px] md:text-[22px] mb-3">
                  {v.title}
                </h3>
                <p className="text-[13.5px] md:text-[14px] leading-[1.7] text-[#0A1A36]/70">
                  {v.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. Differentiators
// ═══════════════════════════════════════════════════════════════════════
const Differentiators = () => {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section
      aria-labelledby="diff-heading"
      className="relative bg-[#FBF8F1] py-20 md:py-28 lg:py-36"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            What Sets Us Apart
          </p>
          <h2
            id="diff-heading"
            className={[
              "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            Four reasons clients{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              choose
            </span>{" "}
            GCSA.
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0A1A36]/10">
          {DIFFERENTIATORS.map((d, i) => (
            <article
              key={d.number}
              className={[
                "group relative bg-[#FBF8F1] p-8 md:p-10 lg:p-12 transition-all duration-[700ms] ease-out hover:bg-white",
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: gridVisible ? `${130 * i}ms` : "0ms" }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: "#FFC72C" }}
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="text-[36px] md:text-[44px] font-extrabold leading-none"
                  style={{ color: "#FFC72C" }}
                >
                  {d.number}
                </span>
                <span
                  className="inline-block w-10 h-px mb-2"
                  style={{ backgroundColor: "#0A1A36", opacity: 0.3 }}
                />
              </div>
              <h3 className="font-extrabold leading-[1.15] tracking-[-0.01em] text-[#0A1A36] text-[22px] md:text-[26px] mb-4">
                {d.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#0A1A36]/70 max-w-md">
                {d.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 5. Journey timeline
// ═══════════════════════════════════════════════════════════════════════
const Journey = () => {
  const [headerRef, headerVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      aria-labelledby="journey-heading"
      className="relative bg-[#0A1A36] text-white py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255,199,44,0.10), transparent 55%), radial-gradient(circle at 10% 90%, rgba(255,199,44,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            Our Journey
          </p>
          <h2
            id="journey-heading"
            className={[
              "font-extrabold leading-[1.02] tracking-[-0.02em] text-white text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            From a single idea to a{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              three-continent
            </span>{" "}
            practice.
          </h2>
        </div>

        <div ref={listRef} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/15"
            aria-hidden="true"
          />

          <ul className="space-y-12 md:space-y-16">
            {MILESTONES.map((m, i) => (
              <li
                key={m.year}
                className={[
                  "relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start transition-all duration-[700ms] ease-out",
                  listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : "",
                ].join(" ")}
                style={{ transitionDelay: listVisible ? `${150 * i}ms` : "0ms" }}
              >
                {/* Dot */}
                <span
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full ring-4 ring-[#0A1A36]"
                  style={{ backgroundColor: "#FFC72C" }}
                  aria-hidden="true"
                />

                <div className={["pl-12 md:pl-0", i % 2 === 1 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"].join(" ")}>
                  <p className="text-[10.5px] font-bold tracking-[0.32em] uppercase text-[#FFC72C] mb-3">
                    {m.year}
                  </p>
                  <h3 className="font-extrabold leading-[1.15] tracking-[-0.01em] text-white text-[24px] md:text-[30px] mb-3">
                    {m.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.75] text-white/70 max-w-md md:ml-auto">
                    {m.copy}
                  </p>
                </div>

                <div className="hidden md:block" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 6. Team
// ═══════════════════════════════════════════════════════════════════════
const TeamSection = () => {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section
      aria-labelledby="team-heading"
      className="relative bg-white py-20 md:py-28 lg:py-36"
    >
      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-14 md:mb-20"
        >
          <div className="max-w-2xl">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
              Our Team
            </p>
            <h2
              id="team-heading"
              className={[
                "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              Experts with{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                proven
              </span>{" "}
              track records.
            </h2>
            <p
              className={[
                "mt-5 md:mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#0A1A36]/70 max-w-xl transition-all duration-700 delay-200",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              Our consultants bring extensive cross-industry knowledge and a
              proven track record in delivering global management consulting.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0A1A36] text-[#0A1A36] hover:bg-[#0A1A36] hover:text-white text-[11px] font-bold tracking-[0.16em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 transition-all duration-300 self-start"
          >
            Join the team
            <FiArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {TEAM.map((member, i) => (
            <article
              key={member.name}
              className={[
                "group relative transition-all duration-[800ms] ease-out",
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              ].join(" ")}
              style={{ transitionDelay: gridVisible ? `${130 * i}ms` : "0ms" }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#0A1A36]">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at GCSA Consulting`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1000ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,26,54,0.2) 0%, rgba(10,26,54,0.45) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-0 left-0 w-10 h-10 transition-transform duration-500 ease-out group-hover:scale-150 origin-top-left pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFC72C 0%, #FFC72C 50%, transparent 50%)",
                  }}
                  aria-hidden="true"
                />
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#0A1A36] hover:bg-[#FFC72C] transition-colors duration-300 opacity-0 group-hover:opacity-100"
                >
                  <FiLinkedin className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-5">
                <p className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#FFC72C] mb-2">
                  {member.role}
                </p>
                <h3 className="font-extrabold leading-[1.15] tracking-[-0.01em] text-[#0A1A36] text-[20px] md:text-[22px] mb-3">
                  {member.name}
                </h3>
                <p className="text-[13px] md:text-[13.5px] leading-[1.65] text-[#0A1A36]/65">
                  {member.bio}
                </p>
              </div>

              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: "#FFC72C" }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 7. CTA strip
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
              Ready to take your business to the{" "}
              <span className="font-light italic" style={{ color: "#FFC72C" }}>
                next level
              </span>
              ?
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
              href="/services"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300"
            >
              View Services
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;