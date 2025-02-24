import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: String,
    wishlist: {
        type: Array,
        default: []
      },
    createdAt: {
        type:Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    }
});
const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;