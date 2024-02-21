import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Task from "../models/TaskModel.js";
import Subtask from "../models/SubTaskModel.js"
import { getDueDateFilter,calculatePriority} from "../utils/priority.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, due_date } = req.body;
  if (!title|| !description || !due_date) {
    return res.status(400).json({
      message: "All fields are mandatory!",
    });
  }
  try{
    const priority = calculatePriority(due_date);
    const task = new Task({
        userId: req.user._id,
        title,
        description,
        due_date,
        priority
    });

    const createdTask = await task.save();
    return res.status(201).json({
        message: "Task created successfully",
        data: createdTask
    });
    
  }catch(error){
    return res.status(400).json({message: "Something went wrong"})
  }
});


const subTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.query.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    try{
        const subtask = new Subtask({
            task_id: task._id,
        });

        await subtask.save();
        return res.status(201).json({
            message: "Subtask created successfully",
            data: subtask
        });
      
    }catch(error){
      return res.status(400).json({message: "Something went wrong"})
    }
});

const getAllTask = asyncHandler(async (req, res) => {
    try{
        const { priority, due_date, page = 1, limit = 10 } = req.query;
        const query = {
            deleted_at: { $exists: false },
        };

        if (priority !== undefined) {
            query.due_date = getDueDateFilter(priority);
        }

        if (due_date !== undefined) {
            query.due_date = { $gte: new Date(due_date) };
        }
        
        const tasks = await Task.find(query)
            .sort({ due_date: 1 }) 
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return res.status(200).json({ tasks, page, limit });
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });    }
});


const getUserSubtask = asyncHandler(async(req,res) => {
    try {
        const taskId = req.query.taskId;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const subtasks = await Subtask.find({ task_id: taskId });

        return res.status(200).json({ subtasks });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const updateTaskById = asyncHandler(async(req,res) => {
    try {
        const taskId = req.query.taskId;
        if (!taskId) return res.status(400).res({message: 'TaskId required'})
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        const {due_date, status} = req.body;

        if (due_date) task.due_date = due_date;
        if (status) task.status = status;

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

const updateSubTaskById = asyncHandler(async(req,res) => {
    try {
        const subTaskId = req.query.subtaskId;
        if (!subTaskId) return res.status(400).json({ message: 'Subtask Id required' });
        const subtask = await Subtask.findById(subTaskId);
        if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

        if (req.body.status) subtask.status = req.body.status;

        await subtask.save();
        return res.status(200).json(subtask);
    } catch (error) {
        return res.status(500).json({ message: error });
    }

});

const deleteTask = asyncHandler(async(req,res) => {
    try {
        const taskId = req.query.taskId;
        if (!taskId) return res.status(400).res({message: 'TaskId required'})
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if(task.deleted_at !== undefined) return res.status(404).json({message: 'Task is already deleted'});

        task.deleted_at = new Date();
        await task.save();
        await Subtask.updateMany({ task_id: taskId }, { $set: { deleted_at: new Date() } });
        return res.status(200).send({message:"Task deleted successfully"});
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});

const deleteSubTask = asyncHandler(async(req,res) => {
    try {
        const subTaskId = req.params.subTaskId;
        if(!subTaskId) return res.status(400).json({message: 'Subtask Id required'})
        
        const subtask = await Task.findById(subTaskId);
        if (!subtask) return res.status(404).json({ message: 'Task not found' });

        subtask.deleted_at = new Date();
        await subtask.save();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});


 
export { createTask, subTask, getAllTask, getUserSubtask, updateTaskById, updateSubTaskById, deleteTask, deleteSubTask};
