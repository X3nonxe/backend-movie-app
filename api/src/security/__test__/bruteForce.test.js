/* eslint-disable no-undef */
const Jest = require('jest-mock');
const bruteForce = require('../bruteForce');

describe('bruteForce', () => {
  test('should return a middleware function', () => {
    expect(typeof bruteForce).toBe('function');
  });
  test('stop request before hitting the limit', () => {
    const req = {
      ip: '127.0.0.3',
      headers: {
        'x-forwarded-for': 'localhost',
      },
    };
    const res = {
      status: Jest.fn(() => res),
      send: Jest.fn(() => res),
    };
    const next = Jest.fn();
    bruteForce(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
