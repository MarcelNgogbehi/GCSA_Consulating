"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiCheck, FiClock, FiUsers, FiAward } from "react-icons/fi";
import { LuGraduationCap, LuRocket, LuTarget, LuTrendingUp } from "react-icons/lu";

/**
 * Training — GCSA Consulting | Training Programmes
 *
 * NEW SECTION (per client brief — talk about training offerings).
 * Highlights the flagship "Transition to Architecture in 6 Weeks"
 * programme from the latest training flyer.
 *
 * Content drawn from the training flyer:
 * - "Design the Future. Lead the Change."
 * - "TRANSITION TO ARCHITECTURE in just 6 weeks!"
 * - High-Impact Career · High-Demand Roles · Higher Influence
 * - Built for: Business Analyst, Developer/Engineer, Project/Programme
 *   Manager, Product Owner, IT/Operations Professional
 * - Master 6 architectural skillsets
 * - Live sessions + practical workshops + Certificate of Completion
 *
 * Brand colours intentionally mirror the flyer (deep navy + gold) to
 * preserve continuity between the printed/digital flyer and the website.
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

const SKILLSETS = [
  {
    n: "1",
    title: "End-to-End Solution Design",
    copy: "Design scalable, integrated solutions that deliver real business value.",
  },
  {
    n: "2",
    title: "Architecture Thinking & Modelling",
    copy: "Apply structured frameworks across business, data, application, and technology layers.",
  },
  {
    n: "3",
    title: "Data & Integration Architecture",
    copy: "Design data flows, APIs, integrations and information models that power modern systems.",
  },
  {
    n: "4",
    title: "Platform & Technology Strategy",
    copy: "Evaluate and align platforms, cloud and technologies to build future-ready solutions.",
  },
  {
    n: "5",
    title: "Stakeholder Influence & Communication",
    copy: "Present architectural decisions with clarity, confidence and executive impact.",
  },
  {
    n: "6",
    title: "Governance & Best Practices",
    copy: "Apply standards, principles and decision frameworks used in enterprise environments.",
  },
];

const TARGET_ROLES = [
  "Business Analyst",
  "Developer / Engineer",
  "Project / Programme Manager",
  "Product Owner",
  "IT / Operations Professional",
];

const PROGRAMME_BENEFITS = [
  "Real-world architecture experience",
  "Portfolio to showcase your skills",
  "Confidence to apply for architect roles",
  "A clear roadmap for your next step",
];

const Training = () => {
  const [headerRef, headerVisible] = useReveal();
  const [cardRef, cardVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();

  return (
    <section
      id="training"
      aria-labelledby="training-heading"
      className="relative bg-white py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Decorative gold blob */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #FFC72C 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#0A1A36]/60 mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-10 h-px" style={{ backgroundColor: "#FFC72C" }} />
            GCSA Training
          </p>

          <h2
            id="training-heading"
            className={[
              "font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0A1A36] text-[40px] md:text-[54px] lg:text-[64px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            Build the skills.{" "}
            <span className="font-light italic" style={{ color: "#FFC72C" }}>
              Lead
            </span>{" "}
            the change.
          </h2>

          <p
            className={[
              "mt-6 md:mt-8 text-[15px] md:text-[17px] leading-[1.75] text-[#0A1A36]/75 max-w-2xl transition-all duration-700 delay-200",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            Beyond consulting, we run intensive, hands-on training programmes
            that turn ambitious professionals into the architects, leaders, and
            strategists their organisations need next. Live sessions, practical
            workshops, and a certificate of completion — all designed to
            fast-track your next career chapter.
          </p>
        </div>

        {/* ── Flagship programme card ────────────────────────────── */}
        <div
          ref={cardRef}
          className={[
            "relative transition-all duration-[1000ms] ease-out",
            cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          ].join(" ")}
        >
          <div className="relative rounded-2xl overflow-hidden bg-[#0A1A36] shadow-[0_30px_80px_-20px_rgba(10,26,54,0.4)]">
            {/* Background atmospherics */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 90% 10%, rgba(255,199,44,0.18), transparent 50%), radial-gradient(circle at 5% 95%, rgba(255,199,44,0.08), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* LEFT — Programme details */}
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 xl:p-16">
                {/* Tag bar — mirrors flyer "DESIGN THE FUTURE. LEAD THE CHANGE." */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#FFC72C] mb-8">
                  <LuRocket className="w-3.5 h-3.5 text-[#0A1A36]" strokeWidth={2.5} />
                  <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#0A1A36]">
                    Design the Future. Lead the Change.
                  </span>
                </div>

                {/* Programme title — mirrors flyer headline */}
                <h3 className="font-extrabold leading-[0.95] tracking-[-0.025em] text-white text-[40px] md:text-[54px] lg:text-[64px] xl:text-[72px]">
                  Transition to{" "}
                  <span style={{ color: "#FFC72C" }}>Architecture</span>
                </h3>
                <p className="mt-2 text-[20px] md:text-[26px] lg:text-[30px] font-bold text-white/90 tracking-[-0.01em]">
                  in just 6 weeks!
                </p>

                {/* Triple-benefit row — mirrors flyer */}
                <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 pb-7 md:pb-9 border-b border-white/15">
                  {[
                    { Icon: LuTarget, label: "High-Impact Career" },
                    { Icon: LuTrendingUp, label: "High-Demand Roles" },
                    { Icon: LuGraduationCap, label: "Higher Influence" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="inline-flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: "#FFC72C" }} aria-hidden="true" />
                      <span className="text-[11px] md:text-[12px] font-bold tracking-[0.14em] uppercase text-white/85">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Description box — mirrors flyer "rocket" callout */}
                <div className="mt-7 md:mt-9 flex items-start gap-4 p-5 md:p-6 rounded-lg bg-white/5 border border-white/15 backdrop-blur-sm">
                  <LuRocket
                    className="shrink-0 w-7 h-7 md:w-8 md:h-8 mt-1"
                    style={{ color: "#FFC72C" }}
                    aria-hidden="true"
                  />
                  <p className="text-[14px] md:text-[16px] leading-[1.65] text-white/90 font-medium">
                    A 6-week intensive, hands-on programme to{" "}
                    <span className="font-extrabold" style={{ color: "#FFC72C" }}>
                      fast-track you into architecture roles.
                    </span>
                  </p>
                </div>

                {/* Built for — target roles */}
                <div className="mt-9 md:mt-11">
                  <p className="text-[10.5px] md:text-[11px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-4">
                    Built for Professionals from Any Background
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TARGET_ROLES.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 text-[11.5px] md:text-[12px] font-semibold text-white/90 hover:bg-[#FFC72C] hover:text-[#0A1A36] hover:border-[#FFC72C] transition-colors duration-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" aria-hidden="true" />
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-[13.5px] md:text-[14.5px] leading-[1.6] text-white/65 italic max-w-md">
                    "If you can solve problems, you can become an{" "}
                    <span className="not-italic font-extrabold" style={{ color: "#FFC72C" }}>
                      Architect.
                    </span>
                    "
                  </p>
                </div>

                {/* Walk-away outcomes */}
                <div className="mt-9 md:mt-11">
                  <p className="text-[10.5px] md:text-[11px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-4">
                    You Will Walk Away With
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {PROGRAMME_BENEFITS.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13.5px] md:text-[14px] text-white/85">
                        <FiCheck
                          className="shrink-0 mt-0.5 w-4 h-4"
                          style={{ color: "#FFC72C" }}
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3">
                  <Link
                    href="/training"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFC72C] hover:bg-[#E6B324] text-[#0A1A36] text-[11.5px] md:text-[12px] font-extrabold tracking-[0.18em] uppercase shadow-[0_10px_30px_-8px_rgba(255,199,44,0.55)] hover:shadow-[0_14px_36px_-8px_rgba(255,199,44,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1A36] focus-visible:ring-[#FFC72C] transition-all duration-300"
                  >
                    Register Today
                    <FiArrowUpRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 hover:border-white/55 text-white text-[11.5px] md:text-[12px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-300"
                  >
                    Enquire
                  </Link>
                </div>

                {/* Logistical strip */}
                <div className="mt-10 md:mt-12 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                  {[
                    { Icon: FiClock, label: "Next Cohort", value: "Starting Soon" },
                    { Icon: FiUsers, label: "Format", value: "Live + Workshops" },
                    { Icon: FiAward, label: "Outcome", value: "Certificate" },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon
                        className="shrink-0 mt-0.5 w-4 h-4"
                        style={{ color: "#FFC72C" }}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-[9.5px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1">
                          {label}
                        </div>
                        <div className="text-[12px] md:text-[13px] font-bold text-white">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Skillsets panel */}
              <div className="relative lg:col-span-5 bg-gradient-to-br from-[#06122A] via-[#0A1A36] to-[#06122A] p-8 md:p-12 lg:p-12 xl:p-14 lg:border-l border-white/10">
                {/* Top headline strip — mirrors flyer "MASTER THE TOP 6" */}
                <div className="mb-10 pb-6 border-b border-[#FFC72C]/30">
                  <p className="text-[10.5px] md:text-[11px] font-bold tracking-[0.28em] uppercase text-[#FFC72C] mb-3">
                    The Curriculum
                  </p>
                  <h4 className="font-extrabold leading-[1.1] tracking-[-0.01em] text-white text-[22px] md:text-[26px] lg:text-[28px]">
                    Master the top{" "}
                    <span style={{ color: "#FFC72C" }}>6 architectural</span>{" "}
                    skillsets.
                  </h4>
                </div>

                <ul className="space-y-5 md:space-y-6">
                  {SKILLSETS.map((skill, idx) => (
                    <li
                      key={skill.n}
                      className={[
                        "group flex items-start gap-4 transition-all duration-700",
                        skillsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                      ].join(" ")}
                      style={{ transitionDelay: skillsVisible ? `${100 * idx}ms` : "0ms" }}
                      ref={idx === 0 ? skillsRef : null}
                    >
                      <span
                        className="shrink-0 inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-[13px] md:text-[14px] font-extrabold transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: "#FFC72C",
                          color: "#0A1A36",
                        }}
                        aria-hidden="true"
                      >
                        {skill.n}
                      </span>
                      <div>
                        <h5 className="font-extrabold uppercase tracking-[0.04em] text-white text-[12.5px] md:text-[13.5px] mb-1.5 leading-tight">
                          {skill.title}
                        </h5>
                        <p className="text-[12.5px] md:text-[13px] leading-[1.6] text-white/70">
                          {skill.copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer strip — mirrors flyer testimonial vibe */}
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5"
                        viewBox="0 0 20 20"
                        fill="#FFC72C"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.286 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[13px] md:text-[14px] leading-[1.6] italic text-white/85">
                    "This programme gave me the practical experience and
                    confidence I needed to step into an Architecture role."
                  </blockquote>
                  <p className="mt-3 text-[10px] font-bold tracking-[0.22em] uppercase text-white/50">
                    — Past Participant
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom strip — limited seats / urgency, mirrors flyer */}
            <div className="relative bg-[#FFC72C] px-8 md:px-12 lg:px-14 xl:px-16 py-5 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0A1A36]">
                  <span className="w-2 h-2 rounded-full bg-[#FFC72C] animate-pulse" />
                </span>
                <div>
                  <div className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#0A1A36]/70">
                    Limited Seats
                  </div>
                  <div className="text-[14px] md:text-[15px] font-extrabold text-[#0A1A36] leading-tight">
                    Next cohort starting soon — secure your spot
                  </div>
                </div>
              </div>
              <Link
                href="/training"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1A36] hover:bg-[#06122A] text-white text-[10.5px] font-extrabold tracking-[0.18em] uppercase transition-all duration-300 self-start sm:self-auto"
              >
                Secure your spot
                <FiArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Browse all programmes link ────────────────────────── */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/training"
            className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.18em] uppercase text-[#0A1A36] hover:text-[#FFC72C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC72C]/40 rounded-sm transition-colors duration-200"
          >
            <span className="relative">
              Browse all training programmes
              <span
                className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: "#FFC72C" }}
                aria-hidden="true"
              />
            </span>
            <FiArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Training;