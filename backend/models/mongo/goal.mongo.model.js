import mongoose from "mongoose"

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ObjectId is required"],
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Goal", goalSchema)
