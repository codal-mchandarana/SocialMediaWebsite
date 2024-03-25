import express from "express";
import { generatepost} from "../Controller/postController.js";
import AuthorizedUser from "../Middleware/CheckUser.js";

const router = express.Router();

router.post('/createPost',AuthorizedUser,generatepost);

router.get('/post',(req,res)=>{
    res.send("Hello")
})

export default router;