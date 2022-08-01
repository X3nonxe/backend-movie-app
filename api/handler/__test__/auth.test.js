/* eslint-disable no-undef */
const auth = require('../auth');

// register testing
describe('Register', () => {
  test('complete register form input', async () => {
    const res = await auth.register({
      username: 'test1',
      password: 'test12345678',
      email: 'test1@gmail.com',
    });
    expect(res).toBeTruthy();
  });
  test('incomplete register form input', async () => {
    const res = await auth.register({
      username: '',
      password: '',
      email: '',
    });
    expect(res).toBeTruthy();
  });
  test('invalid email register form', async () => {
    const res = await auth.register({
      username: 'test2',
      password: 'test12345678',
      email: 'test',
    });
    expect(res).toBeTruthy();
  });
  test('invalid password register form', async () => {
    const res = await auth.register({
      username: 'test3',
      password: 'test',
      email: 'test3@gmail.com',
    });
    expect(res).toBeTruthy();
  });
  test('invalid username register form', async () => {
    const res = await auth.register({
      username: '',
      password: 'test12345678',
      email: 'test4@gmail.com',
    });
    expected(res).toBeTruthy();
  });
  test('invalid username and password register form', async () => {
    const res = await auth.register({
      username: '',
      password: '',
      email: 'test5@gmail.com',
    });
    expect(res).toBeTruthy();
  });
  test('invalid username and email register form', async () => {
    const res = await auth.register({
      username: '',
      password: 'test12345678',
      email: '',
    });
    expect(res).toBeTruthy();
  });
  test('invalid password and email register form', async () => {
    const res = await auth.register({
      username: 'test',
      password: '',
      email: '',
    });
    expect(res).toBeTruthy();
  });
  test('invalid username and password and email register form', async () => {
    const res = await auth.register({
      username: 't',
      password: 'test',
      email: 'test',
    });
    expect(res).toBeTruthy();
  });
  test('existing email register form', async () => {
    const res = await auth.register({
      username: 'test',
      password: 'test12345678',
      email: 'test@gmail.com',
    });
    expect(res).toBeTruthy();
  });
});
// Login testing
describe('Login', () => {
  test('complete login form input', async () => {
    const res = await auth.login({
      email: 'test1@gmail.com',
      password: 'test12345678',
    });
    expected(res).toBeTruthy();
  });
  test('incomplete login form input', async () => {
    const res = await auth.login({
      email: '',
      password: '',
    });
    expect(res).toBeTruthy();
  });
  test('invalid email login form', async () => {
    const res = await auth.login({
      email: 'test',
      password: 'test12345678',
    });
    expect(res).toBeTruthy();
  });
  test('invalid password login form', async () => {
    const res = await auth.login({
      email: 'test1@gmail.com',
      password: 'test123456789',
    });
    expect(res).toBeTruthy();
  });
  test('invalid password login form', async () => {
    const res = await auth.login({
      email: 'test1@gmail.com',
      password: 'test',
    });
    expect(res).toBeTruthy();
  });
  test('invalid email login form', async () => {
    const res = await auth.login({
      email: 'test',
      password: 'test12345678',
    });
    expect(res).toBeTruthy();
  });
  test('invalid password login form', async () => {
    const res = await auth.login({
      email: 'test1@gmail.com',
      password: 'test',
    });
    expect(res).toBeTruthy();
  });
  test('invalid email and password login form', async () => {
    const res = await auth.login({
      email: 'test',
      password: 'test',
    });
    expect(res).toBeTruthy();
  });
  test('existing email login form', async () => {
    const res = await auth.login({
      email: 'test7@gmail.com',
      password: 'test12345678',
    });
    expect(res).toBeTruthy();
  });
});
