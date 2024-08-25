import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  star: { type: Number, required: true },
  desc: { type: String }
});

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;