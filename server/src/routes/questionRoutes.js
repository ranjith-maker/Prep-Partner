
import express from 'express'
import { togglePinQuestion, updateQuestionNote, addQuestionsToSession } from '../controllers/questionController.js'
import {authUser} from '../middleware/authUser.js'
 

const questionRoutes = express.Router()


questionRoutes.post('/addquestions', authUser, addQuestionsToSession )
questionRoutes.post('/pin/:id', authUser, togglePinQuestion)
questionRoutes.post('/update/:id', authUser, updateQuestionNote )



export default questionRoutes

