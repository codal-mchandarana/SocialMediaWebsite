import express from "express";
import checkUser from "../Middleware/CheckUser.js";
import {postComment} from "../Controller/commentController.js";

const router = express.Router();

router.post('/commentAdd',checkUser,postComment)

export default router;