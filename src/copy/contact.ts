export const contactCopy = {
  hero: {
    heading: "Get In Touch",
    description:
      "Whether you're hiring, have a project in mind, or just want to connect — I'd love to hear from you.",
  },
  options: {
    heading: "Choose your preferred channel",
    description:
      "Book a call for the fastest path, or reach out by email/LinkedIn if you prefer async.",
    call: {
      title: "Book a Call",
      description:
        "The fastest way to discuss a project or opportunity. Grab a 30-minute slot and let's chat.",
      badge: "Fastest path",
      cta: "Schedule a call",
      fallbackCta: "Email me instead",
    },
    email: {
      title: "Send an Email",
      description:
        "Prefer to write it out? Send me an email and I'll get back to you within 1-2 business days.",
    },
    linkedin: {
      title: "Connect on LinkedIn",
      description: "Let's connect professionally.",
      cta: "View Profile",
    },
  },
  form: {
    heading: "Or send me a message",
    intro:
      "Share a little context and I'll reply within 1-2 business days with recommended next steps.",
    nameLabel: "Name",
    emailLabel: "Email",
    topicLabel: "What can I help you with?",
    messageLabel: "Message",
    topicHint: "Pick the option that best matches your request.",
    messageHint: "Include goals, timeline, or constraints so I can respond with useful direction.",
    supportHeading: "What happens next",
    supportSteps: [
      "I review your message and priorities.",
      "I follow up with suggested next steps.",
      "If needed, we schedule a quick call.",
    ],
    supportDetail: "Need a faster response? Use the call option above.",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Tell me about your project or opportunity...",
    submitLabel: "Send Message",
    submittingLabel: "Sending...",
    topicDefault: "Select an option",
    topics: [
      { value: "hiring", label: "Hiring for full-time role" },
      { value: "freelance", label: "Freelance project" },
      { value: "connect", label: "Just want to connect" },
      { value: "other", label: "Other" },
    ],
    successTitle: "Message sent!",
    successDescription:
      "Thanks for reaching out. I'll get back to you within 1-2 business days.",
    unavailableTitle: "Form temporarily unavailable",
    unavailableDescription:
      "The contact form is currently unavailable. Please email me directly and I'll reply within 1-2 business days.",
  },
  location: {
    label: "Based in",
    value: "Barrie, Ontario, Canada.",
    detail:
      "Available for remote work worldwide. Open to in-person meetings in the Barrie and Greater Toronto Area.",
  },
} as const;
