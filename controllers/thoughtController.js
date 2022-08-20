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

  //create a thought (TODO don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err)
        return res.status(500).json(err)
      });
  },
  // // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  // ```

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

  // !course
  // ? res.status(404).json({ message: 'No course with that ID' })
  // : Student.deleteMany({ _id: { $in: course.students } })

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        !course
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(course)
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  
  //post to create a reaction stored in a single thought's reactions array field

  //`DELETE` to pull and remove a reaction by the reaction's `reactionId` value
}


