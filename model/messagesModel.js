import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: false,
  },
  productId: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "not replied",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export const Messages = mongoose.model("Messages", messageSchema);
