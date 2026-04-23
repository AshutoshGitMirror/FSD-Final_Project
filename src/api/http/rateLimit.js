const now = () => Date.now();

export const createRateLimiter = ({ windowMs, max, keyFromRequest }) => {
  const buckets = new Map();

  return (request, response, next) => {
    const key = keyFromRequest(request);
    const bucket = buckets.get(key) ?? [];
    const windowStart = now() - windowMs;
    const active = bucket.filter((ts) => ts > windowStart);

    if (active.length >= max) {
      response.status(429).json({ error: "Too many requests, please retry shortly" });
      return;
    }

    active.push(now());
    buckets.set(key, active);
    next();
  };
};
