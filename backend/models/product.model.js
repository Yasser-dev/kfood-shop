import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter a product name"],
    trim: true,
    maxLength: [100, "Product name must be less than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "You must enter the product's price"],
    maxLength: [5, "Price can't exceed 5 digits"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "You must enter a product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "You must enter a product category"],
  },
  brand: {
    type: String,
    required: [true, "You must enter a product brand"],
  },
  stock: {
    type: Number,
    required: [true, "You must enter the product stock"],
    maxLength: [5, "Stock can't exceed 5 digits"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
