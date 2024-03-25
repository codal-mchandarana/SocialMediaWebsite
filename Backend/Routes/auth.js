import express from "express";

/* Importing Controllers */
import {postLogin, postSignUp} from "../Controller/adminController.js";

const router = express.Router()

router.post('/signUp',postSignUp)
router.post('/login',postLogin)

export default  router;