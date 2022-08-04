/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const Jest = require('jest-mock');
const lists = require('../lists');

describe('List', () => {
  test('title must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'te',
        type: 'series',
        genre: 'comedy',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: '\"title\" length must be at least 3 characters long',
    });
  });
  test('title must be less than 10 character', async () => {
    const req = {
      body: {
        title: 'test1234567890101122334',
        type: 'series',
        genre: 'comedy',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: '\"title\" length must be less than or equal to 10 characters long',
    });
  });
  test('type must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        type: 'se',
        genre: 'comedy',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: '\"type\" length must be at least 3 characters long',
    });
  });
  test('type must be less than 10 character', async () => {
    const req = {
      body: {
        title: 'test',
        type: 'series1111111111111111',
        genre: 'comedy',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: '\"type\" length must be less than or equal to 10 characters long',
    });
  });
  test('genre must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        type: 'series',
        genre: 'co',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: '\"genre\" length must be at least 3 characters long',
    });
  });
  test('genre must be less than 10 character', async () => {
    const req = {
      body: {
        title: 'test',
        type: 'series',
        genre: 'co',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: '\"genre\" length must be less than or equal to 10 characters long',
    });
  });
  test('title is required', async () => {
    const req = {
      body: {
        title: '',
        type: 'series',
        genre: 'comedy',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await lists.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create list',
      message: 'title is required',
    });
  });
});
