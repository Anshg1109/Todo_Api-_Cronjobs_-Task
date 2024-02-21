import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
  title: { 
    type: String
  },
  description: { 
    type: String
  },
  due_date: {
    type: Date
  },
  priority: {
    type: Number
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO'
  },
  deleted_at: {
    type: Date,
  }
},
{ timestamps: true }
);



const Task = mongoose.model('task', taskSchema);

export default Task;