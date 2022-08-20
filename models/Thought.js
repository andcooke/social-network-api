// **Thought**:
const { Schema, model } = require('mongoose');
const formatDate = require('../utils/format')

const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
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
      get: formatDate
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
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
      maxLength: [280, 'Your thought is too much for me to handle.']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;