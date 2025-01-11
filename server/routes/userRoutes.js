import { Router } from "express";
import {  deleteuser, getallEmployees, getProfile, getUserDetails, login, logout, register, searchEmployee , } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
// import { isLoggedIn } from "../middlewares/authmiddleware.js";

//import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router()

router.post('/register'  , upload.single('Avatar'), register)
router.post('/login' ,login)
router.post('/logout' ,logout)
router.get("/me" ,isLoggedIn,getProfile)
// router.route("/me").get(isLoggedIn, getProfile)
router.get('/getallemployee',getallEmployees)
router.get('/searchem',searchEmployee)

router.get('/:id' , isLoggedIn, getUserDetails)
router.delete('/:id' , isLoggedIn, deleteuser)


// router.post('/reset' ,forgetPassword)
// router.post('/reset/:resetToken' , resetPassword)
// router.put("/update/:id" ,isLoggedIn,upload.single("avatar") ,updateUser)

export default router

