const Joi = require('joi');
const Movie = require('../models/Movies');

// Create Movie
const createMovie = async (req, res) => {
  if (req.user.is_admin) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(10).required(),
      desc: Joi.string().min(3).max(100).required(),
      img: Joi.string().min(3).max(100),
      img_title: Joi.string().min(3).max(100),
      img_sm: Joi.string().min(3).max(100),
      trailer: Joi.string().min(3).max(100),
      video: Joi.string().min(3).max(100),
      year: Joi.string().min(4).max(4),
      limit: Joi.number().min(1).max(10),
      genre: Joi.string().min(3).max(10),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: error.details[0].message,
      });
    }
    const isInputUserNotEmpty = req.body.title.length < 1 && req.body.desc.length < 1;
    if (isInputUserNotEmpty) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: 'title and desc are required',
      });
    }
    if (req.body.title.length < 1) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: 'title is required',
      });
    }
    if (req.body.desc.length < 1) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: 'desc is required',
      });
    }
    const movie = new Movie(req.body);
    try {
      const result = await movie.save();
      return res.status(200).json({
        status: 'success',
        message: 'Movie created successfully',
        data: { result, csrfToken: req.csrfToken() },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
};

// Update Movie
const updateMovie = async (req, res) => {
  if (req.user.is_admin) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(10).required(),
      desc: Joi.string().min(3).max(100).required(),
      img: Joi.string().min(3).max(100),
      img_title: Joi.string().min(3).max(100),
      img_sm: Joi.string().min(3).max(100),
      trailer: Joi.string().min(3).max(100),
      video: Joi.string().min(3).max(100),
      year: Joi.string().min(4).max(4),
      limit: Joi.number().min(1).max(10),
      genre: Joi.string().min(3).max(10),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: error.details[0].message,
      });
    }
    const isInputUserNotEmpty = req.body.title.length < 1 && req.body.desc.length < 1;
    if (isInputUserNotEmpty) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: 'title and desc are required',
      });
    }
    if (req.body.title.length < 1) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: 'title is required',
      });
    }
    if (req.body.desc.length < 1) {
      return res.status(400).json({
        status: 'failed to create movie',
        message: 'desc is required',
      });
    }
    try {
      const result = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        },
      );
      return res.status(200).json({
        status: 'success',
        message: 'Movie updated successfully',
        data: { result, csrfToken: req.csrfToken() },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
};

// Delete Movie
const deleteMovie = async (req, res) => {
  if (req.user.is_admin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: 'success',
        message: 'Delete movie successfully',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
};

// Get Movie
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).json({
      status: 'success',
      message: 'Movie fetched successfully',
      data: { movie, csrfToken: req.csrfToken() },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Get Random Movie
const getRandomMovie = async (req, res) => {
  const query = req.query.type;
  let movies;
  try {
    if (query === 'series') {
      movies = await Movie.aggregate([{ $match: { is_series: true } }, { $sample: { size: 1 } }]);
    } else {
      movies = await Movie.aggregate([{ $match: { is_series: false } }, { $sample: { size: 1 } }]);
    }
    return res.status(200).json({
      status: 'success',
      message: 'Movie fetched successfully',
      data: { movies, csrfToken: req.csrfToken() },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Get all movie
const getAllMovie = async (req, res) => {
  if (req.user.is_admin) {
    try {
      const movies = await Movie.find();
      return res.status(200).json({
        status: 'success',
        message: 'Movies fetched successfully',
        data: { movies, csrfToken: req.csrfToken() },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getAllMovie,
  getRandomMovie,
};
