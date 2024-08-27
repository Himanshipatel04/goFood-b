import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orders:{
    type:Array,
    required:true
  }
});

const Orders = mongoose.model("Orders",orderSchema)

export {Orders}
