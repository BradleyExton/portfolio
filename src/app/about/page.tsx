import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Bradley Exton",
  description:
    "Learn more about Bradley Exton, a senior full-stack developer based in Barrie, Ontario with 9+ years of experience building web applications.",
};

export default function AboutPage() {
  const techStack = {
    "Front-End": "React, Next.js, TypeScript, Tailwind CSS, HTML/CSS",
    "Back-End": "Node.js, Python, REST APIs, GraphQL, PostgreSQL, MongoDB",
    "Tools & Platforms": "Git, Vercel, AWS, Figma, Linear, Jira",
    "Currently Exploring": "AI integrations, LLMs, automation workflows",
  };

  const beliefs = [
    {
      title: "Code should solve problems, not create them.",
      description:
        "I write clean, maintainable code because I've inherited enough messy codebases to know the difference. Future you (or the next developer) will thank you.",
    },
    {
      title: "Modern tools exist for a reason.",
      description:
        "React, Next.js, Tailwind — these aren't buzzwords. They're tools that let me build faster, more reliable applications. I use them because they work.",
    },
    {
      title: "Communication matters as much as code.",
      description:
        "The best developers I've worked with are the ones who can explain what they're building and why. I aim to be one of those developers.",
    },
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-space-grotesk)]">
              About Me
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              I&apos;m a senior full-stack developer based in Barrie, Ontario.
              I&apos;ve spent the last 9+ years building web applications at
              companies ranging from early-stage startups to established tech
              platforms.
            </p>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              My Story
            </h2>
            <div className="prose prose-slate prose-lg max-w-none">
              <p className="text-slate-600 leading-relaxed mb-6">
                I got into programming because I wanted to build things — not
                just use them. After studying Computer Programming at Conestoga
                College, I landed my first dev job at Weedmaps in 2016. I
                started as a junior and grew into an intermediate role over 3.5
                years, learning what it takes to ship real products to real
                users.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                From there, I moved through roles at RenoRun (scaling a
                logistics platform across North America) and Local Logic
                (building location intelligence tools). Each company taught me
                something different — how to move fast at a startup, how to
                scale systems, and how to collaborate with product and design
                teams to build features people actually use.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Now I&apos;m focused on two things: continuing to grow as a
                senior developer, and helping local businesses get access to the
                same quality of web development that tech companies take for
                granted.
              </p>
            </div>
          </div>
        </section>

        {/* What I Believe Section */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              What I Believe
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 font-[family-name:var(--font-space-grotesk)]">
              My approach to building software
            </h3>

            <div className="space-y-8">
              {beliefs.map((belief) => (
                <div
                  key={belief.title}
                  className="bg-white p-6 rounded-xl border border-slate-200"
                >
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {belief.title}
                  </h4>
                  <p className="text-slate-600">{belief.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              Tech Stack
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 font-[family-name:var(--font-space-grotesk)]">
              What I work with
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(techStack).map(([category, tools]) => (
                <div
                  key={category}
                  className="p-6 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <h4 className="font-semibold text-slate-900 mb-2">
                    {category}
                  </h4>
                  <p className="text-slate-600">{tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outside of Code Section */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              Outside of Code
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              When I&apos;m not building software, you&apos;ll find me in Barrie
              enjoying the outdoors, keeping up with the latest in tech, or
              working on side projects that scratch a creative itch. I&apos;m
              always happy to chat — whether it&apos;s about a potential
              project, a job opportunity, or just to talk shop about web
              development.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Want to work together?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              I&apos;m open to new opportunities — both full-time roles and
              select freelance projects. If you think we&apos;d be a good fit,
              I&apos;d love to hear from you.
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
              <a
                href="https://www.linkedin.com/in/bradley-exton-7aa347136/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
