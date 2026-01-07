"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", topic: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-space-grotesk)]">
              Get In Touch
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Whether you&apos;re hiring, have a project in mind, or just want
              to connect — I&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Book a Call */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-emerald-600"
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
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Book a Call
                </h3>
                <p className="text-slate-600 mb-4">
                  The fastest way to discuss a project or opportunity. Grab a
                  30-minute slot and let&apos;s chat.
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_CALCOM_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Schedule a call
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
                </a>
              </div>

              {/* Email */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-emerald-600"
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
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Send an Email
                </h3>
                <p className="text-slate-600 mb-4">
                  Prefer to write it out? Send me an email and I&apos;ll get
                  back to you within 1-2 business days.
                </p>
                <a
                  href="mailto:bradley@bradleyexton.ca"
                  className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  bradley@bradleyexton.ca
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
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Connect on LinkedIn
                </h3>
                <p className="text-slate-600 mb-4">
                  Let&apos;s connect professionally.
                </p>
                <a
                  href="https://www.linkedin.com/in/bradley-exton-7aa347136/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  View Profile
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

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-space-grotesk)]">
                Or send me a message
              </h2>

              {submitStatus === "success" ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <svg
                    className="w-12 h-12 text-emerald-600 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Message sent!
                  </h3>
                  <p className="text-slate-600">
                    Thanks for reaching out. I&apos;ll get back to you within
                    1-2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      What can I help you with?
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="hiring">Hiring for full-time role</option>
                      <option value="freelance">Freelance project</option>
                      <option value="connect">Just want to connect</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
                      Something went wrong. Please try again or email me
                      directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-12 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-900">Based in</span>{" "}
              Barrie, Ontario, Canada.
            </p>
            <p className="text-slate-500 mt-2">
              Available for remote work worldwide. Open to in-person meetings in
              the Barrie and Greater Toronto Area.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
