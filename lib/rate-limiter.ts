import { RateLimiter } from "limiter";

const ipLimiters = new Map<string, RateLimiter>();

const MAX_REQUESTS_PER_WINDOW = 20;
const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

export function checkRateLimit(ip: string) {
  const cleanIp = ip.split(":")[0];

  // Skip rate limiting for local development
  if (
    cleanIp === "127.0.0.1" ||
    cleanIp === "localhost" ||
    cleanIp === "::1"
  ) {
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW,
      resetTime: new Date(Date.now() + WINDOW_MS),
      windowMinutes: WINDOW_MS / (60 * 1000),
    };
  }

  if (!ipLimiters.has(cleanIp)) {
    ipLimiters.set(
      cleanIp,
      new RateLimiter({
        tokensPerInterval: MAX_REQUESTS_PER_WINDOW,
        interval: WINDOW_MS,
        fireImmediately: true,
      })
    );
  }

  const limiter = ipLimiters.get(cleanIp)!;
  const remainingRequests = limiter.getTokensRemaining();
  const tokenRemoved = limiter.tryRemoveTokens(1);

  return {
    allowed: tokenRemoved,
    remaining: Math.max(0, remainingRequests - (tokenRemoved ? 1 : 0)),
    resetTime: new Date(Date.now() + WINDOW_MS),
    windowMinutes: WINDOW_MS / (60 * 1000),
  };
}

// Cleanup old rate limiters periodically to prevent memory leaks
setInterval(() => {
  ipLimiters.forEach((limiter, ip) => {
    if (limiter.getTokensRemaining() === MAX_REQUESTS_PER_WINDOW) {
      ipLimiters.delete(ip);
    }
  });
}, WINDOW_MS);
