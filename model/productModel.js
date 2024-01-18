import mongoose from "mongoose";
import { deleteAllDocuments } from "../controllers/Authentication/deleteMany";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  images: {
    type: Array,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  categoryId: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "available",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);
