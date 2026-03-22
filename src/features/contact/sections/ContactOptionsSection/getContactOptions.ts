import { contactCopy } from "@/copy/contact";
import { profile, profileComputed } from "@/copy/profile";

export type ContactOptionKey = "call" | "email" | "linkedin";

type GetContactOptionsParams = {
  calcomUrl: string | null;
  onCallClick: () => void;
  onEmailClick: () => void;
  onLinkedinClick: () => void;
};

export const getContactOptions = ({
  calcomUrl,
  onCallClick,
  onEmailClick,
  onLinkedinClick,
}: GetContactOptionsParams) => {
  return [
    {
      key: "call" as const,
      variant: "primary" as const,
      badge: contactCopy.options.call.badge,
      icon: "call" as const,
      title: contactCopy.options.call.title,
      description: contactCopy.options.call.description,
      href: calcomUrl ?? profileComputed.mailto,
      external: Boolean(calcomUrl),
      onClick: onCallClick,
      label: calcomUrl ? contactCopy.options.call.cta : contactCopy.options.call.fallbackCta,
    },
    {
      key: "email" as const,
      variant: "default" as const,
      icon: "email" as const,
      title: contactCopy.options.email.title,
      description: contactCopy.options.email.description,
      href: profileComputed.mailto,
      external: false,
      onClick: onEmailClick,
      label: profile.email,
    },
    {
      key: "linkedin" as const,
      variant: "default" as const,
      icon: "linkedin" as const,
      title: contactCopy.options.linkedin.title,
      description: contactCopy.options.linkedin.description,
      href: profile.links.linkedin,
      external: true,
      onClick: onLinkedinClick,
      label: contactCopy.options.linkedin.cta,
    },
  ];
};
