/**
 * If you import a dependency which does not include its own type definitions,
 * TypeScript will try to find a definition for it by following the `typeRoots`
 * compiler option in tsconfig.json. For this project, we've configured it to
 * fall back to this folder if nothing is found in node_modules/@types.
 *
 * Often, you can install the DefinitelyTyped
 * (https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for the
 * dependency in question. However, if no one has yet contributed definitions
 * for the package, you may want to declare your own. (If you're using the
 * `noImplicitAny` compiler options, you'll be required to declare it.)
 *
 * This is an example type definition which allows import from `module-name`,
 * e.g.:
 * ```ts
 * import something from 'module-name';
 * something();
 * ```
 */
declare module 'xss-middleware' {
  import { IFilterXSSOptions } from 'xss';

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
