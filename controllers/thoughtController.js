const { User, Thought } = require('../models');


module.exports = {
  
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get a single thought
  getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId})
      .select('-__v')
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: 'No thought with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id }},
          { new: true }
        );
      })
      .then((thought) => 
        !thought
          ? res 
            .status(404)
            .json({ message: 'Thought created, but no user with this ID'})
          : res.json({ message: 'Thought created!' })
      )
      .catch((err) => {
        console.error(err);
      })
  },

  //update a thought 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $set: req.body },
      { runValidators: true, new: true}
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
    

  //delete a thought


  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought with this id!' })
          return;
        }
      })
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  

  // POST to create a reaction stored in a single thought's reactions array field

  //`DELETE` to pull and remove a reaction by the reaction's `reactionId` value
}


