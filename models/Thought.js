// **Thought**:
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      /* TODO look into default objectid */
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [280, 'Your reaction is too much.']
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      /* TODO getter method to format the timestamp on query */
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, 'Your thought has no content.'],
      maxLength: [280, 'Your thought has too much content.']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      /* TODO use a getter method to format the timestamp on query */
    },
    username: {
      type: String,
      required: true,
      /* TODO could need more */
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;