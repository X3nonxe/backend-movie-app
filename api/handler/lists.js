const router = require('express').Router();
const List = require('../models/List');
const verifyUser = require('../src/verifyToken');

// Create List
router.post('/', verifyUser, async (req, res) => {
  if (req.user.is_admin) {
    const listMovie = new List(req.body);
    try {
      const result = await listMovie.save();
      res.status(200).json({
        status: 'success',
        message: 'List created successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
});

// Get List
router.get('/', verifyUser, async (req, res) => {
  const typeList = req.query.type;
  const genreList = req.query.genre;
  let list = [];
  try {
    if (typeList) {
      if (genreList) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeList, genre: genreList } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeList } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    return res.status(200).json({
      status: 'success',
      message: 'List fetched successfully',
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
  // other problems
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
});

// Delete List
router.delete('/:id', verifyUser, async (req, res) => {
  if (req.user.is_admin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'List deleted successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
});

module.exports = router;
