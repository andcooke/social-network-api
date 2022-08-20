// **Thought**:
const { Schema, model } = require('mongoose');

const formatDate = (date) => {
  const d = date.getDate();
  const m = date.getMonth()+1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes()
  return `${m}/${d}/${y} ${h}:${min}`
}


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
      maxLength: [280, 'Your thought has too much content.']
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