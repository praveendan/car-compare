import exception from '../Exception.js'
import { ALLOWED_ROUTES } from './../constants.js'

export function pathWhitelistMiddleware(req, res, next) {
  const matched = ALLOWED_ROUTES.some((regex) => regex.test(req.path));
  if (!matched) {
    return res.status(403).json(exception(req, 'Forbidden', 'API route not allowed', 403));
  }
  next();
}