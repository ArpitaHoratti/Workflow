const mongoose = require("mongoose");
import bcrypt from "bcrypt";
import jwt, { sign } from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true,"This can't be empty"],
      trim: true,
    },

    email: {
      type: String,
      required: [true,"This can't be empty"],
      unique: true,
      lowercase: true,
      trim: true,
      index:true
    },

    password: {
      type: String,
      required: [true,"This can't be empty"],
    },

    signeture:{
        type:String, //Cloudery
        default:null,
        required:[true,"This can't be empty"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

     role: {
      type: String,
      enum: [
        "class_teacher",
        "principal",
        "coordinator",
        "management",
      ],
      required: true,
    },

  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // If password hasn't changed, don't hash again
  if (!this.isModified("password")) {
    return next();
  }

  // Generate hash password
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect= async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesstoken=function(){
    return jwt.sign(
      {
        _id: this._id,
      }

    )
}
userSchema.methods.generateRefreshtoken=function(){
  
}


module.exports = mongoose.model("User", userSchema);