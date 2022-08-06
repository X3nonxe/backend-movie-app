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
      status: 'failed to update user',
      message: '"username" length must be at least 3 characters long',
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
      status: 'failed to update user',
      message: '"username" length must be less than or equal to 30 characters long',
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
      status: 'failed to update user',
      message: '"password" length must be at least 8 characters long',
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
      status: 'failed to update user',
      message: '"password" length must be less than or equal to 30 characters long',
    });
  });
  test('invalid email format', async () => {
    const req = {
      body: {
        username: 'test',
        email: 'test@gmail.yahoo',
        password: 'testting123456',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update user',
      message: '"email" must be a valid email',
    });
  });
  test('required email input', async () => {
    const req = {
      body: {
        username: 'test',
        email: '',
        password: 'testting123456',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update user',
      message: 'Email is required',
    });
  });
  test('required username input', async () => {
    const req = {
      body: {
        username: '',
        email: 'test@gmail.com',
        password: 'test12345678',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update user',
      message: 'Username is required',
    });
  });
  test('required password input', async () => {
    const req = {
      body: {
        username: 'test',
        email: 'test@gmail.com',
        password: '',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update user',
      message: 'Password is required',
    });
  });
  test('required email and password input', async () => {
    const req = {
      body: {
        username: 'test',
        email: '',
        password: '',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update user',
      message: 'Email and Password is required',
    });
  });
  test('required username, email, and password input', async () => {
    const req = {
      body: {
        username: '',
        email: '',
        password: '',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await users.updateUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update user',
      message: 'Username, email, and password are required',
    });
  });
});
