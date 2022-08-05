/* eslint-disable no-undef */
const verifyToken = require('../verifyToken');

describe('verify JWT token', () => {
  test('should return a middleware function', () => {
    expect(typeof verifyToken).toBe('function');
  });
});
