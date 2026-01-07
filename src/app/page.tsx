"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
  ];

  const skillAreas = [
    {
      label: "Front-End",
      skills: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      label: "Back-End",
      skills: "Node.js, Python, REST APIs, GraphQL",
    },
    {
      label: "Tools",
      skills: "Git, Vercel, AWS, Figma",
    },
    {
      label: "Exploring",
      skills: "AI integrations, LLMs, automation",
    },
  ];

  const experience = [
    {
      company: "Local Logic",
      role: "Senior Software Developer",
      description:
        "Building location intelligence tools that help people understand neighborhoods through data.",
      period: "2022 - Present",
      current: true,
    },
    {
      company: "RenoRun",
      role: "Software Developer",
      description:
        "Scaled the contractor supply-chain platform across North American markets.",
      period: "2020 - 2022",
      current: false,
    },
    {
      company: "Weedmaps",
      role: "Junior → Intermediate Developer",
      description:
        "Grew from junior to intermediate over 3.5 years, building consumer and B2B tools in the cannabis tech space.",
      period: "2016 - 2020",
      current: false,
    },
  ];

  const services = [
    {
      title: "Websites",
      description:
        "Marketing sites and landing pages built with modern tools — fast, responsive, and easy to update.",
      price: "Starting at $1,500",
      icon: "🌐",
    },
    {
      title: "Web Applications",
      description:
        "Dashboards, booking systems, client portals — tools built specifically for how your business operates.",
      price: "Starting at $3,000",
      icon: "⚡",
    },
    {
      title: "AI-Powered Tools",
      description:
        "Chatbots, automated workflows, and integrations that save hours of manual work.",
      price: "Custom pricing",
      icon: "🤖",
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "Bradley built exactly what we needed — no fluff, no delays. Professional and efficient.",
      name: "Client Name",
      role: "CEO, Tech Startup",
    },
    {
      id: 2,
      quote:
        "Professional, responsive, and genuinely cared about the outcome. Would highly recommend.",
      name: "Client Name",
      role: "Founder, Local Business",
    },
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Content */}
              <div
                className={`lg:col-span-3 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Available for opportunities
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight font-[family-name:var(--font-space-grotesk)]">
                  Senior{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                    Full-Stack
                  </span>{" "}
                  Developer
                </h1>

                <p className="text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                  I&apos;m Bradley — a developer based in Barrie, Ontario with
                  9+ years of experience building web applications, from
                  early-stage startups to scale-ups. I specialize in React,
                  Node.js, and modern JavaScript.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#experience"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    View My Work
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-lg font-medium border border-slate-200 transition-colors"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>

              {/* Profile Image */}
              <div
                className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80 lg:w-full lg:h-auto lg:aspect-square max-w-sm">
                  {/* Glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-20 blur-xl" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-30" />

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-2xl">
                    <Image
                      src="/images/me.png"
                      alt="Bradley Exton"
                      fill
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Years badge */}
                  <div className="absolute -bottom-2 -right-2 md:bottom-4 md:right-0 bg-white rounded-xl shadow-lg px-4 py-2 border border-slate-100">
                    <p className="text-2xl font-bold text-emerald-600">9+</p>
                    <p className="text-xs text-slate-500 font-medium">
                      Years Exp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div
              className={`mt-16 flex flex-wrap gap-3 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About Snapshot Section */}
        <section id="about" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                  What I Do
                </h2>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-space-grotesk)]">
                  Building fast, reliable web applications
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  I build fast, reliable web applications — the kind that scale.
                  Currently a Senior Developer at Local Logic, I&apos;ve spent
                  the last decade shipping product across companies like
                  Weedmaps and RenoRun.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  More about me
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Skill Areas Grid */}
              <div className="grid grid-cols-2 gap-4">
                {skillAreas.map((area) => (
                  <div
                    key={area.label}
                    className="p-5 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <h4 className="font-semibold text-slate-900 mb-2">
                      {area.label}
                    </h4>
                    <p className="text-sm text-slate-500">{area.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              Experience
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-12 font-[family-name:var(--font-space-grotesk)]">
              Where I&apos;ve Worked
            </h3>

            <div className="space-y-6">
              {experience.map((job) => (
                <div
                  key={job.company}
                  className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-slate-900">
                          {job.company}
                        </h4>
                        {job.current && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-emerald-600 font-medium mb-2">
                        {job.role}
                      </p>
                      <p className="text-slate-500">{job.description}</p>
                    </div>
                    <div className="text-sm text-slate-400 font-medium md:text-right whitespace-nowrap">
                      {job.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://www.linkedin.com/in/bradley-exton-7aa347136/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                View full experience on LinkedIn
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                Services
              </h2>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-space-grotesk)]">
                Available for Select Projects
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Outside of my full-time role, I take on a limited number of
                projects for local businesses and startups.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 mb-4">{service.description}</p>
                  <p className="text-emerald-600 font-semibold">
                    {service.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                Learn more about services
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                Testimonials
              </h2>
              <h3 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-space-grotesk)]">
                What People Are Saying
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-300 text-lg mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section
          id="contact"
          className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Let&apos;s Connect
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Whether you&apos;re hiring, have a project in mind, or just want
              to chat about tech — I&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:bradley@bradleyexton.ca"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Me an Email
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book a Call
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
