import mongoose from "mongoose";
import { date } from "zod";


const customerSchema = new mongoose.Schema({
    UserId : String,
    name: String,
    orders: {
        type:[{type: mongoose.Schema.Types.ObjectId, ref:"Order"}]
    },
    createdAt : {
        type: Date,
        default : Date.now,
    }, 
    updatedAt : {
        type: Date,
        default : Date.now,
    }
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export default Customer;