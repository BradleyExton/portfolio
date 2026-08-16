type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Per-instance memory, so this is best-effort: serverless spreads traffic across
// instances and a determined flood will still get through. It exists to stop the
// cheap case (one script hammering one endpoint), not as real abuse protection.
// Vercel's firewall is the tool to reach for if this ever gets seriously targeted.
const buckets = new Map<string, Bucket>();

export const getRequestIp = (headers: Headers): string => {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    if (first?.trim()) {
      return first.trim();
    }
  }

  return headers.get("x-real-ip")?.trim() ?? "unknown";
};

export const consumeRateLimit = (key: string, now: number): boolean => {
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  bucket.count += 1;
  return true;
};

export const resetRateLimits = () => {
  buckets.clear();
};
