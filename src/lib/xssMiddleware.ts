/* eslint-disable functional/immutable-data */
import { SanitizeOptions } from 'xss-middleware';

import { sanitize } from './sanitize';

/**
 * Sanitizes user input from potential cross-site scripting (XSS) attacks.
 *
 * @param options - Optional configuration options to customize the sanitization process.
 *
 */
function xssMiddleware(options?: SanitizeOptions) {
  return (
    req: {
      body?: Record<string, unknown>;
      query?: Record<string, unknown>;
      params?: Record<string, unknown>;
    },
    _res: Record<string, unknown>,
    // eslint-disable-next-line functional/no-return-void
    next: (param?: unknown) => void
  ) => {
    if (req.body) req.body = sanitize(req.body, options);
    if (req.query) req.query = sanitize(req.query, options);
    if (req.params) req.params = sanitize(req.params, options);

    next();
  };
}

export default xssMiddleware;
