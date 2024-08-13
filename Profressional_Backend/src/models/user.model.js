import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        index: true   //for searching in database
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,   //cloudinary url
        require: true,
    },
    coverImage: {
        type: String    //cloudiary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        require: [true,"Password is required"]

    },
    refreshToken:{
        type: String
    }

},{timestamps: true});  //use timestamps to saved time in database.

UserSchema.pre("save", async function(next){    //arrow function doesnt have `this` forthat reason we use normal function
    if(!this.isModified("password")) return next();
    // `.isModified()` is used to check that thing is modified or not.

    this.password = await bcrypt.hash(this.password,10);
    next();
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}   //bcrypt.compare() is compare two things. We actually dont use normal compare function, because those password are hashed.

userSchema.methods.generateAccressToken = function(){
    jwt.sign({
        _id:this._id,   //this information things comes from database
        email: this.email,  //In Accress token, we need more information
        username:this.username,
        fullname:this.fullname
    },process.env.ACCESS_TOKEN_SECERT,{expiresIn:process.env.ACCESS_TOKEN_EXPRIY});
};

userSchema.methods.generateRefreshToken = function(){
    jwt.sign({  //it needs less information
        _id:this._id,   //this information things comes from database
    },process.env.REFRESH_TOKEN_SECERT,{expiresIn:process.env.REFRESH_TOKEN_EXPRIY});
}

export const User = mongoose.model("User",userSchema);