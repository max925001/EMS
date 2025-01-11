import { Schema,model } from "mongoose";
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'


const userSchema = new Schema(
    {
        fullName: {
           type: String,
required:[true,'name is required'],
minLength:[5,'Name must be at least 5 charcter'],
maxLength:[100, 'name should be less 100 charcter'],
lowercase: true,
trim:true

        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [8, "Password should be at least 6 characters"],
            select: false,
        },
        Avatar: {
            public_id:{
                type:String
            },
            secure_url:{
                type:String
            }
        },
       
        department:{
            type:String,
            required:true
        },
        dateofjoining:{
            type:String,
            required:true

        },
        status:{
            type: String,
             enum: ['Active', 'Inactive'], 
             default: 'Active' ,


        },
        salary:{
            type: Number,
            required:true

        },
        role:{
            type:String,
            enum:['USER' ,'ADMIN','MANAGER'],
            required:true
        }
    },
    {
        timestamps: true,}
)




userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password =  await bcrypt.hash(this.password,10)
})

userSchema.methods ={
    generateJWTtoken:  async function(){
        return await Jwt.sign(
            {
                id: this._id ,email: this.email,
                role: this.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
,
comparePassword: async function(plaintextPassword){

    return  await bcrypt.compare(plaintextPassword,this.password)
},
generatePasswordResetToken: async function(){

    const resetToken = crypto.randomBytes(20).toString('hex')

this.forgotPasswordToken =crypto
.createHash('sha256')
.update(resetToken)
.digest('hex')
this.forgotPasswordExpiry = Date.now() *15*60*60*1000
return resetToken
}


}

const User = model("User", userSchema);
export default User