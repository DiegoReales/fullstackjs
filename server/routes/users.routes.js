import { Router } from "express";

import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.controllers.js";

const router = Router()

router.get("/", getUsers)

router.post("/users", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router