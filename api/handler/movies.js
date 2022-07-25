const router = require('express').Router();
const Movie = require('../models/Movies');
const verifyUser = require('../src/verifyToken');

// Create Movie
router.post('/', verifyUser, async (req, res) => {
  if (req.user.is_admin) {
    const movie = new Movie(req.body);
    try {
      const result = await movie.save();
      res.status(200).json({
        status: 'success',
        message: 'Movie created successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
});

// Update Movie
router.put('/:id', verifyUser, async (req, res) => {
  if (req.user.is_admin) {
    try {
      const result = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      );
      res.status(200).json({
        status: 'success',
        message: 'Movie updated successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
});

// Delete Movie
router.delete('/:id', verifyUser, async (req, res) => {
  if (req.user.is_admin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Delete movie successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'failed',
    message: 'You are not authorized to perform this action',
  });
});

// Get Movie
router.get('/:id', verifyUser, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Movie fetched successfully',
      data: movie,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});

// Get Random Movie
router.get('/random', verifyUser, async (req, res) => {
  const query = req.query.type;
  let movies;
  try {
    if (query === 'series') {
      movies = await Movie.aggregate([
        { $match: { is_series: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movies = await Movie.aggregate([
        { $match: { is_series: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json({
      status: 'success',
      message: 'Movie fetched successfully',
      data: movies,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});

module.exports = router;
