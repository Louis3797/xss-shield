/* eslint-disable functional/immutable-data */
import type { NextFunction, Request, Response } from 'express';
import { SanitizeOptions } from 'xss-middleware';

import { sanitize } from './sanitize';

/**
 * Sanitizes user input from potential cross-site scripting (XSS) attacks.
 *
 * @param options - Optional configuration options to customize the sanitization process.
 *
 */
function xssMiddleware(options?: SanitizeOptions) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.body) req.body = sanitize(req.body, options);
    if (req.query) req.query = sanitize(req.query, options);
    if (req.params) req.params = sanitize(req.params, options);

    next();
  };
}

export default xssMiddleware;
