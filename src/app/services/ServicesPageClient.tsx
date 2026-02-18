"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Websites",
    description:
      "Marketing sites, landing pages, and business websites built with modern tools. Fast, responsive, and designed to convert.",
    price: "Starting at $1,500",
    icon: "🌐",
    features: [
      "Custom design (no templates)",
      "Mobile-responsive layout",
      "SEO fundamentals",
      "Contact forms",
      "Analytics setup",
      "1 month of support after launch",
    ],
    bestFor:
      "Small businesses, startups, professionals who need an online presence that actually works.",
  },
  {
    title: "Web Applications",
    description:
      "Custom dashboards, booking systems, client portals, and internal tools — built specifically for how your business operates.",
    price: "Starting at $3,000",
    icon: "⚡",
    features: [
      "Requirements discovery session",
      "Custom UI/UX design",
      "Full-stack development",
      "Database setup",
      "User authentication (if needed)",
      "Deployment and hosting setup",
      "1 month of support after launch",
    ],
    bestFor:
      "Businesses that have outgrown spreadsheets, need to automate workflows, or want a custom tool that off-the-shelf software can't provide.",
  },
  {
    title: "AI-Powered Tools",
    description:
      "Chatbots, automated workflows, and smart integrations that save hours of manual work.",
    price: "Custom pricing",
    icon: "🤖",
    features: [
      "Customer service chatbot for your website",
      "Automated lead qualification",
      "Document processing and data extraction",
      "Custom AI assistants for your team",
    ],
    bestFor:
      "Businesses looking to automate repetitive tasks or add intelligent features to their existing tools.",
  },
];

const process = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "We hop on a 30-minute call to discuss your project. I'll ask questions to understand what you need, and give you honest feedback on scope, timeline, and budget.",
  },
  {
    step: 2,
    title: "Proposal",
    description:
      "If we're a good fit, I'll send a clear proposal with scope, timeline, and fixed pricing. No surprises.",
  },
  {
    step: 3,
    title: "Build",
    description:
      "I work in short cycles, sharing progress along the way. You'll see your project come together and have opportunities to give feedback before we're too far down the road.",
  },
  {
    step: 4,
    title: "Launch & Handoff",
    description:
      "I deploy your project, walk you through everything, and make sure you're set up for success. I stick around for a month after launch to handle any issues.",
  },
];

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "Simple websites: 2-3 weeks. Web applications: 4-8 weeks depending on complexity. I'll give you a realistic timeline in our discovery call.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes. After the included support period, I offer monthly maintenance packages starting at $150/month. We can discuss what makes sense for your project.",
  },
  {
    question: "Can you work with my existing site?",
    answer:
      "Depends on what it's built with. I'm happy to take a look and let you know what's possible.",
  },
  {
    question: "What if I just need a small update or fix?",
    answer:
      "I offer hourly work for smaller tasks at $100/hour with a 2-hour minimum. Get in touch with details.",
  },
  {
    question: "Do you do design, or just development?",
    answer:
      "I do both. I handle the full process from design to deployment. If you already have designs, I can work from those too.",
  },
];

export default function ServicesPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-space-grotesk)]">
              Services
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              I take on a limited number of freelance projects alongside my
              full-time work. If you need a website, web application, or custom
              tool built right — let&apos;s talk.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="grid md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div>
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-3xl">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-space-grotesk)]">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {service.price}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-slate-600"
                        >
                          <svg
                            className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">
                          Best for:
                        </span>{" "}
                        {service.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How I Work Section */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              Process
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-12 font-[family-name:var(--font-space-grotesk)]">
              How I Work
            </h3>

            <div className="space-y-8">
              {process.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              FAQ
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 font-[family-name:var(--font-space-grotesk)]">
              Common Questions
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-slate-500 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
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
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Let&apos;s build something.
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Book a free 30-minute discovery call. I&apos;ll give you honest
              advice on your project — whether we end up working together or
              not.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-emerald-50 transition-colors"
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
              Book a Free Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
