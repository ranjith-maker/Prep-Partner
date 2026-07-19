import express from 'express'
import { createSession, deleteSession, getAllSessions, getSessionbyId } from '../controllers/sessionController.js'
import {authUser} from '../middleware/authUser.js'
 

const sessionRoutes = express.Router()



sessionRoutes.post('/create-session', authUser, createSession )
sessionRoutes.get('/get-allsessions' ,authUser,getAllSessions)
sessionRoutes.get('/get-session/:id', authUser, getSessionbyId )
sessionRoutes.delete('/delete-session/:id',authUser, deleteSession )



export default sessionRoutes


