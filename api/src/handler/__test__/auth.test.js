/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const Jest = require('jest-mock');
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: '\"username\" length must be less than or equal to 30 characters long',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: '\"username\" length must be at least 3 characters long',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: '\"password\" length must be less than or equal to 30 characters long',
    });
  });
  test('password less than 8 characters', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test',
        username: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: '\"password\" length must be at least 8 characters long',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to register',
      message: '"email" must be a valid email',
    });
  });
});

describe('Login', () => {
  test('invalid email format', async () => {
    const req = {
      body: {
        email: 'test@gmail.yahoo',
        password: 'test12345678',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to login',
      message: '"email" must be a valid email',
    });
  });
  test('password more than 30 character', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'test1234567890123456789012345678901',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to login',
      message: '"password" length must be less than or equal to 16 characters long',
    });
  });
  test('password less than 3 character', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: 'te',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to login',
      message: '"password" length must be at least 8 characters long',
    });
  });
  test('invalid email input', async () => {
    const req = {
      body: {
        email: '',
        password: 'test12345678',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to login',
      message: 'Email is required',
    });
  });
  test('invalid password input', async () => {
    const req = {
      body: {
        email: 'test@gmail.com',
        password: '',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to login',
      message: 'Password is required',
    });
  });
  test('invalid email and password input', async () => {
    const req = {
      body: {
        email: '',
        password: '',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to login',
      message: 'Email and Password are required',
    });
  });
});
