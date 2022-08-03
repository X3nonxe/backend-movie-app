const router = require('express').Router();
const bruteForce = require('../security/bruteForce');
const csrfProtection = require('../security/csrf');
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
router.post('/api/auth/register', bruteForce, csrfProtection, register);
router.post('/api/auth/login', bruteForce, csrfProtection, login);
// lists
router.post('/api/lists/', verifyToken, csrfProtection, createList);
router.get('/api/lists/', verifyToken, csrfProtection, getList);
router.delete('/api/lists/:id', verifyToken, deleteList);
// movies
router.post('/api/movies/', bruteForce, csrfProtection, createMovie);
router.put('/api/movies/:id', bruteForce, csrfProtection, updateMovie);
router.get('/api/movies/:id', bruteForce, csrfProtection, getMovie);
router.get('/api/movies/random', bruteForce, csrfProtection, getRandomMovie);
router.get('/api/movies/', bruteForce, csrfProtection, getAllMovie);
router.delete('/api/movies/:id', bruteForce, deleteMovie);
// users
router.put('/api/users/:id', verifyToken, csrfProtection, updateUserById);
router.delete('/api/users/:id', verifyToken, deleteUser);
router.get('/api/users/find/:id', verifyToken, csrfProtection, getUserById);
router.get('/api/users/', verifyToken, csrfProtection, getAllUser);
router.get('/api/users/stats', verifyToken, csrfProtection, userStats);

module.exports = router;
