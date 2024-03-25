import Sequelize from "sequelize";
import db from "../DataBase/database.js";

const User = db.sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false
    },
    password:Sequelize.STRING,
    name:Sequelize.STRING,
    phone:Sequelize.INTEGER,
    address:Sequelize.STRING,
    gender:Sequelize.STRING,
})

export default User;