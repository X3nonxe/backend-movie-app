/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
const Jest = require('jest-mock');
const movies = require('../movies');

describe('Create movies', () => {
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"desc\" length must be less than or equal to 100 characters long',
    });
  });
  test('img must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'te',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"img\" length must be at least 3 characters long',
    });
  });
  test('img must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"img\" length must be less than or equal to 100 characters long',
    });
  });
  test('img_title must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'te',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"img_title\" length must be at least 3 characters long',
    });
  });
  test('img_title must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"img_title\" length must be less than or equal to 100 characters long',
    });
  });
  test('img_sm must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'te',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"img_sm\" length must be at least 3 characters long',
    });
  });
  test('img_sm must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"img_sm\" length must be less than or equal to 100 characters long',
    });
  });
  test('trailer must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'te',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"trailer\" length must be at least 3 characters long',
    });
  });
  test('trailer must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"trailer\" length must be less than or equal to 100 characters long',
    });
  });
  test('video must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'te',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"video\" length must be at least 3 characters long',
    });
  });
  test('video must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"video\" length must be less than or equal to 100 characters long',
    });
  });
  test('year must be more than 4 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: '202',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"year\" length must be at least 4 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"year\" length must be less than or equal to 4 characters long',
    });
  });
  test('limit must be more than 1 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 1,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"limit\" length must be at least 1 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 1000000000000000000000000,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"limit\" length must be less than or equal to 10 characters long',
    });
  });
  test('genre must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'te',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"genre\" length must be at least 3 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: '\"genre\" length must be less than or equal to 10 characters long',
    });
  });
  test('title and desc must be not empty', async () => {
    const req = {
      body: {
        title: '',
        desc: '',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: 'title and desc are required',
    });
  });
  test('title must be not empty', async () => {
    const req = {
      body: {
        title: '',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: 'title is required',
    });
  });
  test('desc must be not empty', async () => {
    const req = {
      body: {
        title: 'test',
        desc: '',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.createMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to create movie',
      message: 'desc is required',
    });
  });
});

describe('Update movies', () => {
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"desc\" length must be less than or equal to 100 characters long',
    });
  });
  test('img must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'te',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"img\" length must be at least 3 characters long',
    });
  });
  test('img must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"img\" length must be less than or equal to 100 characters long',
    });
  });
  test('img_title must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'te',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"img_title\" length must be at least 3 characters long',
    });
  });
  test('img_title must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"img_title\" length must be less than or equal to 100 characters long',
    });
  });
  test('img_sm must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'te',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"img_sm\" length must be at least 3 characters long',
    });
  });
  test('img_sm must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"img_sm\" length must be less than or equal to 100 characters long',
    });
  });
  test('trailer must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'te',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"trailer\" length must be at least 3 characters long',
    });
  });
  test('trailer must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"trailer\" length must be less than or equal to 100 characters long',
    });
  });
  test('video must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'te',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"video\" length must be at least 3 characters long',
    });
  });
  test('video must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        year: 'test',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"video\" length must be less than or equal to 100 characters long',
    });
  });
  test('year must be more than 4 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: '202',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"year\" length must be at least 4 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        limit: 10,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"year\" length must be less than or equal to 4 characters long',
    });
  });
  test('limit must be more than 1 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: '',
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"limit\" length must be at least 1 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 1000000000000000000000000,
        genre: 'test',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"limit\" length must be less than or equal to 10 characters long',
    });
  });
  test('genre must be more than 3 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'te',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"genre\" length must be at least 3 characters long',
    });
  });
  test('desc must be less than 100 character', async () => {
    const req = {
      body: {
        title: 'test',
        desc: 'test',
        img: 'test',
        img_title: 'test',
        img_sm: 'test',
        trailer: 'test',
        video: 'test',
        year: 'test',
        limit: 10,
        genre: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
      },
    };
    const res = {
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: '\"genre\" length must be less than or equal to 10 characters long',
    });
  });
  test('title and desc must be not empty', async () => {
    const req = {
      body: {
        title: '',
        desc: '',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: 'title and desc are required',
    });
  });
  test('title must be not empty', async () => {
    const req = {
      body: {
        title: '',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: 'title is required',
    });
  });
  test('desc must be not empty', async () => {
    const req = {
      body: {
        title: 'test',
        desc: '',
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
      status: Jest.fn().mockReturnThis(),
      json: Jest.fn().mockReturnThis(),
    };
    await movies.updateMovie(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed to update movie',
      message: 'desc is required',
    });
  });
});
