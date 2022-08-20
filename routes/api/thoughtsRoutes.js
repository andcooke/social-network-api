const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js')

// * `GET` to get all thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

module.exports=router;
