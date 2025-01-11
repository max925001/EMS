import { token } from "morgan"
import AppError from "../utils/error.js"
import jwt from "jsonwebtoken"
const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("Token in isLoggedIn middleware:", token);

    if (!token) {
        return next(new AppError('Unauthenticated. Please login.', 400));
    }

    try {
        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails; // Attach user to request object
        console.log("req.user in isLoggedIn middleware:", req.user);
        next(); // Pass control to next middleware
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return next(new AppError('Invalid token. Please login again.', 401));
    }
};



const authorizedRoles = (...roles) => async(req,res,next)=>{
const currentUserRole = req.user.role

if(!roles.includes(currentUserRole)){
return next(
    new AppError('You do not have permission to access')
)

}
next()

}









export{
    isLoggedIn    
    ,authorizedRoles 
}