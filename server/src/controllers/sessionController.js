import Session from '../models/sessionModel.js'
import User from '../models/userModel.js'
import AppError, { catchAsync } from '../utils/CustomError.js'
import Question from '../models/questionModel.js'




export const createSession = catchAsync(async(req , res , next)=>{

    const {role, experience, topicsToFocus, description, questions } = req.body

    const userId = req.user._id

    if(!role || !experience || !topicsToFocus){
        throw new AppError('role, experience, topicToFocus are mandatory fields',400)
    }

    const session = await Session.create({
     user: userId,
     role,
     experience,
     topicsToFocus,
     description,
    })

//for each gen a docu and all ques get one session id 
    const questionDocs = await Promise.all(
        questions.map((async(q)=>{
            const question = await Question.create({
                session : session._id,
                question : q.question,
                answer: q.answer
            })
        return question._id    
        }))
    )
     session.questions = questionDocs
// console.log(questionDocs);

     await session.save()

     res.status(201).json({
        success: true,
        message: 'New Session is Created',
        data:session,

     })

})



//here we go inside session so we need to populate the generated questions as well

export const getAllSessions = catchAsync(async(req , res , next)=>{
   const id = req.user._id
    const session = await Session.find({user:id})
    .sort({ createdAt: -1 }).populate('questions')

    res.status(200).json({
        success: true,
        message : `Fetched all the session of ${req.user.name}`,
        data:session
    })

})
   



//The options object lets you customize how the populated documents are fetched.
export const getSessionbyId = catchAsync(async(req , res , next)=>{

 const {id} = req.params

  if(!id){
    throw new AppError('ID is not valid',400)
  }
  
 const session = await Session.findById(id)
 .populate({path: 'questions', 
           options: {sort: { isPinned : -1 , createdAt : -1    }   }
  }).exec()

 if(!session){
    throw new AppError('No session found',404)
 }

  res.status(200).json({
    success :true,
    message : 'Fetched One Session',
    data : session
  })

})
/**All pinned questions come first.
Within pinned questions, the newest comes first.
Then all unpinned questions.
Within unpinned questions, the newest comes first. */



//when you delete a session make sure delete quesitons as well 
export const deleteSession = catchAsync(async(req , res , next)=>{

 const {id} = req.params

  if(!id){
    throw new AppError('ID is not valid',400)
  }
  
 const session = await Session.findById(id)

 if(!session){
    throw new AppError('No session found',404)
 }

  if(!session.user.equals(req.user._id)){
    throw new AppError('You are not authorize to delete it',404)
 }

  await Question.deleteMany({ session : session._id })
  await Session.deleteOne()
  

  res.status(200).json({
    success :true,
    message : 'Deleted One Session', 

  })



})















