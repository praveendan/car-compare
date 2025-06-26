import crypto from 'crypto'
import exception from '../Exception.js'

const MAX_DRIFT = 5 * 60 * 1000 //  5 min

export const validateSignature = (req, res, next) => {
  const timestamp = req.headers['x-timestamp'];
  const signature = req.headers['x-signature'];

  if (!timestamp || !signature) {
    return res.status(400).json(exception(req, 'AuthError', 'Missing auth headers', 400))
  }

  const now = Date.now()
  const drift = Math.abs(now - parseInt(timestamp, 10))


  if (isNaN(parseInt(timestamp, 10)) || drift > MAX_DRIFT) {
    return res.status(403).json(exception(req, 'AuthError', 'Timestamp expired or invalid', 403));
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.PROXY_SECRET)
    .update(timestamp)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(403).json(exception(req, 'AuthError', 'Invalid signature', 403));
  }

  next();
}