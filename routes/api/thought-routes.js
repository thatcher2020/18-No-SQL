const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);
module.exports = router