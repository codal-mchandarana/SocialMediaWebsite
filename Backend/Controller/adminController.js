import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../Model/User.js";

/* Sign Up controller */
export const postSignUp = async (req,res)=>{
    const {name,email,password,verifypassword} = req.body;

    if(password!=verifypassword)
        return res.status(500).json('Password not matching');

        let result;

    try {
        result  = await User.findOne({where:{email:email}});
    }
    catch (err){
        return res.status(500).json({error:"User Already exists"})
    }

    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password,salt);
    const UserResult = await User.create({name,email,password:hash});

    if(UserResult)
        return res.status(200).json('User Created SuccessFully');
    else
        res.status(500).json("Not Able to create user");
}

/* Login controller */
export const postLogin = async (req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)

    if(!email || !password)
        return res.status(500).json({msg:"Input valid Input"});

    let result;

    try {
        result = await User.findOne({where:{email:email}});
    } catch (error) {
        return res.status(500).json("No User Found !");
    }

    let compare_result;

    try {
         compare_result = await bcrypt.compare(password,result.dataValues.password);
    } catch (error) {
        return res.status(500).json(error)
    }

    if(compare_result) {
        const jwtSecretKey = process.env.SECRET_KEY;
        const token =  jwt.sign(result.dataValues,jwtSecretKey);
        return res.status(200).json({msg:"Authorized user",token:token})
    }

    return res.status(401).json("UnAuthorized user ")
}
