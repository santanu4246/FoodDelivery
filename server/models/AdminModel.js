import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["masteradmin", "admin"],
    required: true
  },
  restrurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restrurant"
  }
});

export default mongoose.model("Admin", adminSchema);
