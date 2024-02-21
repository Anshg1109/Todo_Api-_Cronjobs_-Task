import express from "express";
// Import controller functions
import {  createTask , subTask ,getAllTask  , getUserSubtask, updateTaskById, updateSubTaskById, deleteTask, deleteSubTask} from "../../controllers/taskController.js";
import {isUser} from "../../middleware/validateTokenHandler.js";
const router = express.Router();


router.post('/create-task',isUser, createTask);
router.post('/create-subtask',isUser, subTask);
router.get('/tasks',isUser, getAllTask);
router.get('/tasks/subtasks',isUser, getUserSubtask);
router.put('/tasks',isUser, updateTaskById);
router.put('/tasks/subtasks',isUser, updateSubTaskById);

router.delete('/tasks',isUser, deleteTask);
router.delete('/tasks/subtasks',isUser, deleteSubTask);


export default router
