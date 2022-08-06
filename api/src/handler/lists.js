const Joi = require('joi');
const List = require('../models/List');

// Create List
const createList = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
    type: Joi.string().min(3).max(10),
    genre: Joi.string().min(3).max(10),
  });
  if (req.body.title.length < 1) {
    return res.status(400).json({
      status: 'failed to create list',
      message: 'title is required',
    });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'failed to create list',
      message: error.details[0].message,
    });
  }
  if (req.user.is_admin) {
    const listMovie = new List(req.body);
    try {
      const result = await listMovie.save();
      return res.status(200).json({
        status: 'success',
        message: 'List created successfully',
        data: { result, csrfToken: req.csrfToken() },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(401).json({
    status: 'error',
    message: 'You are not authorized to perform this action',
  });
};

// Get List
const getList = async (req, res) => {
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
      data: { list, csrfToken: req.csrfToken() },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Delete List
const deleteList = async (req, res) => {
  if (req.user.is_admin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: 'success',
        message: 'List deleted successfully',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
  return res.status(401).json({
    status: 'error',
    message: 'You are not authorized to perform this action',
  });
};

module.exports = { createList, getList, deleteList };
