import mongoose from 'mongoose'

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const Subject = mongoose.model('Subject', subjectSchema)

export default Subject
