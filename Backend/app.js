import express from 'express';
import db from './DataBase/database.js';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

/* Importing routes */
import auth from "./Routes/auth.js";
import post from './Routes/post.js'

/* Importing Controllers */
import {urlNotFound} from './Controller/error.js'
import User from "./Model/User.js";
import Post from "./Model/Post.js";
import Comment from "./Model/Comment.js";
import comment from "./Routes/Comment.js";


const app = express()
/* For parsing application/json  */
app.use(express.json())
app.use(cors({origin:['http://localhost:3000'], credentials:true}))
/*  For parsing application/x-www-form-urlencoded */
app.use(express.urlencoded({extended:true}));

/* Using Paths middleware */
app.use('/auth',auth);
app.use(post)
app.use('/comment',comment)

app.get('/',(req,res)=>{
    res.send("Hello Word !")
})

app.get('/id',(req,res)=>{
    res.send("Hello Id !")
})

/* Error middleware */
app.use(urlNotFound)

/*  Relational Mapping */

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.belongsToMany(Comment,{through:'User_Comment'});
Comment.belongsToMany(User,{through:'User_Comment'});



/* Database Connection and running port */

db.sequelize
    // .sync({force:true})
    .sync()
    .then(()=>{
        return "Successfully Connected with posgresql database"
    })
    .then((message)=>{
        console.log(message)
        app.listen(8080,()=>{
            console.log("Server is running on PORT 8080")
        })
    })