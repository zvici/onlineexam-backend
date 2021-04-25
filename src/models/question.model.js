import mongoose from 'mongoose'

const answerSchema = mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
    result: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Chapter',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Question = mongoose.model('Question', questionSchema)

export default Question
