import cron from 'node-cron';
import Task from '../models/TaskModel.js';
import User from '../models/userModel.js';
import makeVoiceCall from "../utils/voiceCallUtils.js"


import {calculatePriority} from "../utils/priority.js";

cron.schedule('0 0 * * *', async () => {
    try {
        const tasks = await Task.find({ deleted_at: { $exists: false } });

        for (const task of tasks) {
            const priority = calculatePriority(task.due_date);
            task.priority = priority;
            await task.save();
        }

        console.log('Cron job executed for changing task priority.');
    } catch (error) {
        console.error('Error executing task priority cron job:', error);
    }
});


cron.schedule('* * * * *', async () => {
    try {
        const users = await User.find({ deleted_at: { $exists: false } }).sort({ priority: 1 });
        let ValidPhones = []
        for (const user of users) {
            const tasks = await Task.find({ user_id: user._id, status: 'TODO', deleted_at: { $exists: false } });
            for (const task of tasks) {
                const currentDate = new Date();
                const dueDate = new Date(task.due_date);
                if (currentDate > dueDate) {
                    ValidPhones.push(user.phone)
                    break;
                }         
            }
        }
        let previousUserAttended = true;
        for(const phone of ValidPhones){
            if (previousUserAttended) {
                const success = await makeVoiceCall(phone);
                previousUserAttended = success;
            }
            else{
                previousUserAttended = true
            }
        }

    } catch (error) {
        console.error('Error executing voice calling cron job:', error);
    }
});

