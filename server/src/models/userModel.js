import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({

name : {
        type : String,
        required : true, 
        trim : true,
    },

email:{
        type : String,
        required : true, 
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
           throw new Error('Email is not valid',value)
    }}
},
  

password : {
    type: String,
    required : true,
    select : false
},

image :{
    type: String
}


}, {timestamps : true} )


userSchema.methods.getJWTToken = function(){

  const payload = {
        id: this._id
    }

   const token = jwt.sign(payload ,process.env.JWT_SECRET , { expiresIn : '7d' }  )
   return token

}


export default mongoose.model('User', userSchema)

