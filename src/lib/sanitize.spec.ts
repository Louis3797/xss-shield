import test from 'ava';
import { SanitizeOptions } from 'xss-middleware';

import { sanitize } from './sanitize';

test('sanitize - should return empty data as is', (t) => {
  t.is(sanitize(null), null);
  t.is(sanitize(undefined), undefined);
  t.is(sanitize(''), '');
  t.deepEqual(sanitize({}), {});

  t.deepEqual(sanitize([]), []);
});

test('sanitize - should sanitize strings', (t) => {
  const input = '<script>alert("hello world!")</script>';
  const expected = '&lt;script&gt;alert("hello world!")&lt;/script&gt;';
  t.is(sanitize(input), expected);
});

test('sanitize - should sanitize objects', (t) => {
  const input = {
    name: '<script>alert("hello world!");</script>',
    age: 20,
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '<script>alert("hello world!");</script>',
    },
    friends: [
      { name: '<script>alert("hello world!");</script>', age: 22 },
      { name: 'Alice', age: '<script>alert("hello world!");</script>' },
    ],
  };

  const expected = {
    name: '&lt;script&gt;alert("hello world!");&lt;/script&gt;',
    age: 20,
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '&lt;script&gt;alert("hello world!");&lt;/script&gt;',
    },
    friends: [
      {
        name: '&lt;script&gt;alert("hello world!");&lt;/script&gt;',
        age: 22,
      },
      {
        name: 'Alice',
        age: '&lt;script&gt;alert("hello world!");&lt;/script&gt;',
      },
    ],
  };

  t.deepEqual(sanitize(input), expected);
});

test('sanitize - should sanitize arrays', (t) => {
  const input = [
    '<script>alert("hello world!")</script>',
    20,
    ['<div>test</div>'],
  ];
  const expected = [
    '&lt;script&gt;alert("hello world!")&lt;/script&gt;',
    20,
    ['&lt;div&gt;test&lt;/div&gt;'],
  ];
  t.deepEqual(sanitize(input), expected);
});

test('sanitize - should sanitize an array of objects', (t) => {
  const input = [
    { name: '<script>alert("hello world!");</script>', age: 20 },
    { name: 'Alice', age: '<script>alert("hello world!");</script>' },
  ];

  const expected = [
    {
      name: '&lt;script&gt;alert("hello world!");&lt;/script&gt;',
      age: 20,
    },
    {
      name: 'Alice',
      age: '&lt;script&gt;alert("hello world!");&lt;/script&gt;',
    },
  ];
  t.deepEqual(sanitize(input), expected);
});

test('sanitize - should allow custom XSS whiteList', (t) => {
  const input = '<div><a href="http://example.com">Example</a></div>';
  const expected = '<div><a href="http://example.com">Example</a></div>';
  const options: SanitizeOptions = {
    whiteList: {
      div: ['*'],
      a: ['href', 'target'],
    },
  };
  t.deepEqual(sanitize(input, options), expected);
});

test('sanitize - should allow custom options', (t) => {
  const input = '<div><a href="http://example.com">Example</a></div>';
  const expected = '';
  const options: SanitizeOptions = {
    stripIgnoreTagBody: ['div'],
  };

  t.deepEqual(sanitize(input, options), expected);
});
