declare module 'xss-shield' {
  import type { IFilterXSSOptions } from 'xss';

  export type Sanitized<T> = T extends (...args: unknown[]) => unknown
    ? T // if T is a function, return it as is
    : T extends Record<string, unknown>
    ? {
        readonly [K in keyof T]: Sanitized<T[K]>;
      }
    : T;

  export type SanitizeOptions = IFilterXSSOptions & {
    readonly whiteList?: IFilterXSSOptions['whiteList'];
  };
}
