import jwt from "jsonwebtoken";
import User from '../Model/User.js'

const AuthorizedUser = async (req, res, next) => {
    let token = req.headers.token;
    let decode_User = await jwt.verify(token, process.env.SECRET_KEY);

    if (decode_User) {
        try {
            let result = await User.findOne({ where: { email: decode_User.email } });
            if (result) {
                req.user = result;
                next();
            }
            else
                throw new Error()
        }catch (error){
            return res.status(500).send("Some Error occured!!");
        }
    }
    else
        return res.status(401).json({ message: "Not Authorized" });
}

export default AuthorizedUser