import setRateLimit from 'express-rate-limit';

const rateLimiteMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 7,
  message: 'You have exceeded your 5 requests per minute limit.',
  keyGenerator: (req: any)=> req.ip
});

export default rateLimiteMiddleware
