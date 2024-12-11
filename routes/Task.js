import express from "express";
import { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } from "../controllers/Task.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { body  } from "express-validator";
const router = express.Router();


router.get("/", getAllTasks)

router.post("/", [
    body("title").notEmpty().withMessage("Title Is Required"),
    body("description").optional(),
    body("priority").notEmpty().withMessage("Priority Is Required")
        .isIn(['LOW', 'MEDIUM', 'HIGH']).withMessage('Priority must be one of LOW, MEDIUM, or HIGH'),
    body("status").notEmpty().withMessage("Status Is Required")
        .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED']).withMessage('Status must be one of TODO, IN_PROGRESS, or COMPLETED'),
    body("duoDate").notEmpty().withMessage("Duo Date Is Required")
], isAuthenticated, createTask)

router.get("/:id", getSingleTask)

router.put("/:id", isAuthenticated, updateTask)

router.delete("/:id", isAuthenticated, deleteTask)


export default router;