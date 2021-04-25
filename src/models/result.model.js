import mongoose from 'mongoose'

const resultSchema = mongoose.Schema(
  {
    done: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Question',
        },
        choice: {
          type: Number,
          required: true,
          default: -1,
        },
      },
    ],
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Schedule',
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

const Result = mongoose.model('Result', resultSchema)

export default Result
