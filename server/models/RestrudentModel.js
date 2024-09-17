import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  cuisine: [String],
  rating: { type: Number },
  location: { type: String, required: true },
  geolocation: { type: String },
  image: { type: String, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  perThali: {
    type: Number,
    default: 100
  }
});

const RestrudentModel = mongoose.model("Restrurant", restaurantSchema);

export default RestrudentModel;
