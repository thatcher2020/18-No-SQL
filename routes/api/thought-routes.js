const router = require('express').Router();

const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/:id')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
