/* eslint-disable no-undef */
const jest = require('jest');
const auth = require('../auth');

describe('Register', () => {
  test('invalid email input', async () => {
    const req = {
      body: {
        email: '',
        password: 'test12345678',
        username: 'test1',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Email is required',
    });
  });
  test('invalid password input', async () => {
    const req = {
      body: {
        email: 'test1@gmail.com',
        password: '',
        username: 'test1',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Password is required',
    });
  });
  test('invalid username input', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test12345678',
        username: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Username is required',
    });
  });
  test('invalid username, password and email input', async () => {
    const req = {
      body: {
        email: '',
        password: '',
        username: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Username, Password and Email are required',
    });
  });
  test('username more than 30 characters', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test12345678',
        username: 'test1234567890123456789012345678901',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Username must be less than 30 characters',
    });
  });
  test('username less than 3 characters', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test12345678',
        username: 'te',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Username must be more than 3 characters',
    });
  });
  test('password more than 30 characters', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test1234567890123456789012345678901',
        username: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Password must be less than 30 characters',
    });
  });
  test('password less than 8 characters', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test12345',
        username: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Password must be more than 8 characters',
    });
  });
  test('email is not valid', async () => {
    const req = {
      body: {
        email: 'test@gmail.yahoo',
        password: 'test12345678',
        username: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Email is not valid',
    });
  });
  test('success register', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test12345678',
        username: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Successfully registered',
    });
  });
  test('email is already registered', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test12345678',
        username: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: 'Email is already registered',
    });
  });
});
