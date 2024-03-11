import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req,res,next) => {
    try{
        const token= req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Non autorizzato - nessun token fornito"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error: "Non autorizzato - token invalido"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({error: "User non trovato"});
        }

        req.user = user;

        next();
    }catch(error){
        console.log("Errore del middleware sul protectRoute", error.message);
        res.status(500).json({error:"Errore del server interno"});
    }
};
export default protectRoute;