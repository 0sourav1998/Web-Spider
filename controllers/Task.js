import { validationResult } from "express-validator";
import Task from "../models/Task.js"

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        if (tasks) {
            return res.status(404).json({
                success: false,
                message: "No Tasks Found"
            })
        };
        return res.status(200).json({
            success: true,
            message: "Tasks Fetched Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Fetching the Tasks"
        })
    }
}

export const createTask = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    try {
        const { title, description, status, priority, duoDate } = req.body;
        if (!title || !status || !priority || !duoDate) {
            return res.status(400).json({
                success: false,
                message: "All Field Are Required"
            })
        }
        const newTask = await Task.create({
            title,
            description: description ? description : "",
            priority,
            status,
            duoDate,
        });
        return res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            newTask
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Creating Task"
        })
    }
}

export const getSingleTask = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "ID field Is Required"
            })
        };
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Task Fetched Successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Fetching Task"
        })
    }
}

export const updateTask = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        const { id } = req.params;
        const { title, description, status, priority, duoDate } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is Requred for updating the Task"
            })
        }
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            })
        }
        if (title) {
            task.title = title;
        }
        if (description) {
            task.description = description;
        }
        if (priority) {
            task.priority = priority;
        }
        if (status) {
            task.status = status;
        }
        if (duoDate) {
            task.duoDate = duoDate;
        }
        await task.save();
        return res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            updateTask
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Updating the Task"
        })
    }
}

export const deleteTask = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Id Not Found"
            })
        }
        const task = await Task.findByIdAndDelete(id);

        return res.status(204).json({
            success: true,
            message: "Task Deleted Successfully",
            deletedTask: task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Deleting the Task"
        })
    }
}