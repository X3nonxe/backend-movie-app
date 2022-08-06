/* eslint-disable no-undef */
const bruteForce = require('../bruteForce');

describe('bruteForce', () => {
  test('should return a middleware function', () => {
    expect(typeof bruteForce).toBe('function');
  });
});
