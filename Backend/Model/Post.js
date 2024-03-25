import Sequelize from "sequelize";
import db from "../DataBase/database.js";

const Post = db.sequelize.define("post",{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
    },
    imageURL:Sequelize.STRING,
    descripition:Sequelize.STRING
})

export default Post;