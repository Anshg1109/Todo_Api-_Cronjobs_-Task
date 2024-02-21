import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type:Number
  },
  priority: { type: Number, enum: [0, 1, 2] },
},
{ timestamps: true }
);


const User = mongoose.model('User', userSchema);

export default User;