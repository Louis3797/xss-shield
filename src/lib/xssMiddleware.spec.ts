/* eslint-disable @typescript-eslint/no-empty-function */
import test from 'ava';
import { SanitizeOptions } from 'xss-middleware';

import { xssMiddleware } from './xssMiddleware';

test('xssMiddleware should sanitize body, query, and params when no options are passed', (t) => {
  const req = {
    body: { name: '<script>alert("xss");</script>' },
    query: { page: '<img src="javascript:alert("xss")" />' },
    params: { id: '<a href="javascript:alert("xss")">Click me</a>' },
  };
  const res = {};
  const next = () => {};
  const expected = {
    body: { name: '&lt;script&gt;alert("xss");&lt;/script&gt;' },
    query: { page: '&lt;img src="javascript:alert("xss")" /&gt;' },
    params: {
      id: '&lt;a href="javascript:alert("xss")"&gt;Click me&lt;/a&gt;',
    },
  };

  xssMiddleware()(req, res, next);

  t.deepEqual(req, expected);
});

test('xssMiddleware should sanitize body, query, and params according to the options passed', (t) => {
  const req = {
    body: { name: '<script>alert("xss");</script>' },
    query: { page: '<img src="javascript:alert("xss")" />' },
    params: { id: '<a href="javascript:alert("xss")">Click me</a>' },
  };
  const res = {};
  const next = () => {};
  const options: SanitizeOptions = {
    whiteList: {
      a: ['href'],
    },
  };
  const expected = {
    body: { name: '&lt;script&gt;alert("xss");&lt;/script&gt;' },
    query: { page: '&lt;img src="javascript:alert("xss")" /&gt;' },
    params: { id: '<a href>Click me</a>' },
  };

  xssMiddleware(options)(req, res, next);

  t.deepEqual(req, expected);
});

test('xssMiddleware should not throw errors when no request data is passed', (t) => {
  const req = {};
  const res = {};
  const next = () => {};

  t.notThrows(() => xssMiddleware()(req, res, next));
});

test('xssMiddleware should not throw errors when undefined request data is passed', (t) => {
  const req = { body: undefined, query: undefined, params: undefined };
  const res = {};
  const next = () => {};

  t.notThrows(() => xssMiddleware()(req, res, next));
});

test('xssMiddleware should call next without any parameters', (t) => {
  const req = {};
  const res = {};
  const next = () => t.pass();

  xssMiddleware()(req, res, next);
});
