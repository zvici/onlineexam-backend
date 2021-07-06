import mongoose from 'mongoose'

const questionSchema = mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
  },
  {
    timestamps: true,
  }
)

const examSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Question',
    },
    status: {
      type: Number,
      required: true,
      default: 1,
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

const Exam = mongoose.model('Exam', examSchema)

export default Exam
