const { json } = require('express/lib/response');
const { User, Thought } = require('../models');

module.exports = {

// * `GET` all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

// * `GET` a single user by its `_id` and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({_id: req.params.userId})
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// * `POST` a new user:
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },


// * `PUT` to update a user by its `_id`
  updateUser(req, res) {
    User.findOneAndUpdate (
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new:true },
    )
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user) 
      )
      .catch((err) => res.status(500).json(err));
  },

// * `DELETE` to remove user by its `_id`
// **BONUS**: Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    User.findOneAndDelete ({ _id: req.params.userId})
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' })
        }
        return;
      } 
      )
      .then(()=> res.json ({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // !course
  // ? res.status(404).json({ message: 'No course with that ID' })
  // : Student.deleteMany({ _id: { $in: course.students } })


// * `POST` to add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate (
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId}},
      { new: true}
    )
    .then((user) => 
      !user
        ? res
          .status(404)
          .json({ message: 'Friend created, but no user with this ID'})
        : res.json({ message: 'Friend added!' })  
    )
    .catch((err) => {
      console.error(err)
    })
  },

// * `DELETE` to remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate (
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId}},
      { new: true}
    )
    .then((user) => 
      !user
        ? res
          .status(404)
          .json({ message: 'Friend removed, but no user with this ID'})
        : res.json({ message: 'Friend removed!' })  
    )
    .catch((err) => {
      console.error(err)
    })
  }
}

