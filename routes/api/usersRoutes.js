const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js')


// /api/users

router.route('/')
  .get(getUsers)
  .post(createUser);


router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)


// * `GET` a single user by its `_id` and populated thought and friend data

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```

// **BONUS**: Remove a user's associated thoughts when deleted.

// ---

// **`/api/users/:userId/friends/:friendId`**

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list


module.exports=router;
