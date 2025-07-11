import rateLimit from 'express-rate-limit';
/**
 * to Limit how often a single IP can hit the proxy.
 */
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});