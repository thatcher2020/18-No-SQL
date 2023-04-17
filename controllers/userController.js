const { Thought, User } = require("../models");

module.exports = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get only one
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // delete a user
  deleteUsers(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: "Thoughts and users deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // update a user
  updateUsers(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a friend
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a friend
  deleteFriend(req, res) {
    console.log("You are deleting a friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
