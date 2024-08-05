const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {timestamps: true}
)

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;