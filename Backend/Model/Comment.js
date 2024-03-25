import Sequelize from "sequelize";
import db from "../DataBase/database.js";

const Comment = db.sequelize.define('comment',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    data:Sequelize.STRING
});

export default Comment;