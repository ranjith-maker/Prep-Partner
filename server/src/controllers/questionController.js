import Question from '../models/questionModel.js'
import Session from '../models/sessionModel.js'
import AppError, { catchAsync } from '../utils/CustomError.js'


//adding additional ques to existing sess when user clciks load more


export const addQuestionsToSession = catchAsync(async(req,res,next)=>{

const { sessionId, questions } = req.body

if(!sessionId || !questions  || !Array.isArray(questions) || questions.length === 0  ){
  throw new AppError('Invalid input data')
}

const session = await Session.findById(sessionId)

if(!session){
  throw new AppError('Session not found')
}

if(!session.user.equals(req.user._id)){
        throw new AppError("You are not authorized",403);
}

//first creating new ques
const createQuestions = await Question.insertMany(
    questions.map((q)=>({
        session : sessionId,
        question: q.question,
        answer : q.answer
    }))
)

//updating sess to include ques IDs inside a session

session.questions.push(...createQuestions.map((q) => q._id ) )
await session.save()

res.status(200).json({
    success : true,
    message: 'New Questions added successfully',
    data:  createQuestions
})


})



export const togglePinQuestion = catchAsync(async(req , res , next)=>{

    const {id} =req.params
    const question = await Question.findById(id)
    
if(!question){
  throw new AppError('question not found')
}  

  question.isPinned = !question.isPinned

 await question.save()

  res.status(200).json({
      success : true,
      message: 'Question is pinned',
      data : question
  })

})



export const updateQuestionNote = catchAsync(async(req,res,next)=>{

const {note} = req.body
const {id} = req.params

const question = await Question.findById(id)

if(!question){
  throw new AppError('question not found')
}  

question.note = note || '',

question.save()

res.status(200).json({

success : true,
message : 'Notes are updated to this question',
data : question

})

})








