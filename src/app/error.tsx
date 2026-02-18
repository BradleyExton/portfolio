"use client";

import { errorCopy } from "@/copy/errors";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-muted px-6 py-16">
      <div className="w-full max-w-xl rounded-2xl border border-border-default bg-surface p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-content font-[family-name:var(--font-space-grotesk)]">
          {errorCopy.general.title}
        </h1>
        <p className="mt-3 text-content-muted">{errorCopy.general.description}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-brand px-5 py-3 font-medium text-content-inverse transition-colors hover:bg-brand-strong"
        >
          {errorCopy.general.action}
        </button>
      </div>
    </main>
  );
}
