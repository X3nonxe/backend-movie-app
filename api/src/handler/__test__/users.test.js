/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const Jest = require('jest-mock');
const users = require('../users');

describe('Users', () => {
  test('username less than 3 character', async () => {
    const req = {
      body: {
        username: 'te',
        email: 'test@gmail.com',
        password: 'testing1234',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update',
      message: '"username" must be at least 3 characters',
    });
  });
  test('username more than 30 character', async () => {
    const req = {
      body: {
        username: 'test123456789101112131415161718',
        email: 'test@gmail.com',
        password: 'testing1234',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update',
      message: '\"username\" length must be less than or equal to 30 characters long',
    });
  });
  test('password less than 8 character', async () => {
    const req = {
      body: {
        username: 'test',
        email: 'test@gmail.com',
        password: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update',
      message: '\"password\" length must be at least 8 characters long',
    });
  });
  test('password more than 30 character', async () => {
    const req = {
      body: {
        username: 'test',
        email: 'test@gmail.com',
        password: 'test1234567890123456789012345678901',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update',
      message: '\"password\" length must be less than or equal to 30 characters long',
    });
  });
});
