import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
 
    image: {
      type: String,
      required: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ],
    cart: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    works: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  })
  const User =mongoose.models.User || mongoose.model("User", userSchema);

  export default User;  