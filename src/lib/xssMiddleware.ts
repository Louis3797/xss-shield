/* eslint-disable functional/immutable-data */
import { SanitizeOptions } from 'xss-middleware';

import { sanitize } from './sanitize';

/**
 * Sanitizes user input from potential cross-site scripting (XSS) attacks.
 *
 * @param options - Optional configuration options to customize the sanitization process.
 *
 */
function xssMiddleware(
  req: {
    body?: Record<string, unknown>;
    query?: Record<string, unknown>;
    params?: Record<string, unknown>;
  },
  _res: Record<string, unknown>,
  // eslint-disable-next-line functional/no-return-void
  next: (param?: unknown) => void,
  options?: SanitizeOptions
) {
  req.body = sanitize(req.body, options);
  req.query = sanitize(req.query, options);
  req.params = sanitize(req.params, options);

  next();
}

export default xssMiddleware;
