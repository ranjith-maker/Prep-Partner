
import express from 'express'
import { getProfile, loginUser, logoutUser, registerUser } from '../controllers/authController.js'
import {authUser} from '../middleware/authUser.js'


const authRoutes = express.Router()


authRoutes.post('/signup' , registerUser)
authRoutes.post('/login' , loginUser)
authRoutes.post('/logout', logoutUser )
authRoutes.get('/get-profile',authUser, getProfile )



export default authRoutes

