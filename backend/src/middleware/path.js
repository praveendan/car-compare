import exception from '../Exception.js'
import { ALLOWED_ROUTES } from './../constants.js'
/**
 * to allow only the pre defined routes
 * So in CarApi.proxy() or middleware, restrict paths:
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const pathWhitelistMiddleware = (req, res, next) => {
  const matched = ALLOWED_ROUTES.some((regex) => regex.test(req.path));
  if (!matched) {
    return res.status(403).json(exception(req, 'Forbidden', 'API route not allowed', 403));
  }
  next();
}