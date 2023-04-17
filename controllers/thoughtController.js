const { User, Thought } = require('../models');
const mongoose = require('mongoose');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // get one thought by id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(400).json(err));
  },

  // create thought
  createThought(req, res) {
    console.log("req.body.userId", req.body.userId)
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.body.userId) },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user found with this id!' })
          : res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((deletedThought) => {
        !deletedThought
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(deletedThought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
