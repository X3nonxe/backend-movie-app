const router = require('express').Router();
const bruteForce = require('../security/bruteForce');
const verifyToken = require('../security/verifyToken');
const { register, login } = require('./auth');
const { createList, getList, deleteList } = require('./lists');
const {
  createMovie, updateMovie, deleteMovie, getMovie, getAllMovie, getRandomMovie,
} = require('./movies');
const {
  updateUserById, deleteUser, getUserById, getAllUser, userStats,
} = require('./users');

// auth
router.post('/api/auth/register', bruteForce, register);
router.post('/api/auth/login', bruteForce, login);
// lists
router.post('/api/lists/', verifyToken, bruteForce, createList);
router.get('/api/lists/', verifyToken, bruteForce, getList);
router.delete('/api/lists/:id', verifyToken, bruteForce, deleteList);
// movies
router.post('/api/movies/', bruteForce, createMovie);
router.put('/api/movies/:id', bruteForce, updateMovie);
router.get('/api/movies/:id', bruteForce, getMovie);
router.get('/api/movies/random', bruteForce, getRandomMovie);
router.get('/api/movies/', bruteForce, getAllMovie);
router.delete('/api/movies/:id', bruteForce, deleteMovie);
// users
router.put('/api/users/:id', verifyToken, updateUserById);
router.delete('/api/users/:id', verifyToken, deleteUser);
router.get('/api/users/find/:id', verifyToken, getUserById);
router.get('/api/users/', verifyToken, getAllUser);
router.get('/api/users/stats', verifyToken, userStats);

module.exports = router;
