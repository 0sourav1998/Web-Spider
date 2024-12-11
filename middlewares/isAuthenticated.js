import jwt from "jsonwebtoken";


export const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                success : false ,
                message:"Token Not Valid"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(decode){
            next();
        }
    } catch (error) {
        return res.status(500).json({
            success:false ,
            message : "Something Went Wrong While Authentication"
        })
    }
}