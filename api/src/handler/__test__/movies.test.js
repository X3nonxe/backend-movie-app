/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
const Jest = require('jest-mock');
const movies = require('../movies');

describe('Movies', () => {
  test('title must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'te',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"title\" length must be at least 3 characters long',
    });
  });
  test('title must be less than 10 character', async () => {
    const req = {
      body: {
        title: 'test1234567890000',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"title\" length must be less than or equal to 10 characters long',
    });
  });
  test('desc must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'te',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"desc\" length must be at least 3 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnValue(),
      json: Jest.fn().mockReturnValue(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"desc\" length must be less than or equal to 100 characters long',
    });
  });
});
