const router = require('express').Router();

const {
  getAllUser,
  getSingleUser,
  createUser,
  deleteUsers,
  updateUsers,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');  

router
  .route('/')
  .get(getAllUser)
  .post(createUser);

router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUsers)
  .delete(deleteUsers);

module.exports = router;