import { GoogleGenAI } from '@google/genai'
import AppError, { catchAsync } from '../utils/CustomError.js'
import { questionAnswerInput, conceptExplanationPrompt } from '../utils/Prompt.js'
import dotenv from 'dotenv'
dotenv.config()


const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY })


export const generateInterviewQuestions = catchAsync(async(req , res , next)=>{

const { role , experience, topicsToFocus, numberOfQuestions } = req.body

if(!role || !experience || !topicsToFocus || !numberOfQuestions ){

    throw new AppError('Missing required fields',400)
}

const prompt = questionAnswerInput(role , experience, topicsToFocus, numberOfQuestions)
 
const response = await ai.models.generateContent({
   
    model : 'gemini-3.5-flash',
    contents: prompt
})

let rawText = response.text

//let's clean the resp for our usecase
const cleanedText = rawText
    .replace(/^```json\s*/, "") 
    .replace(/```$/, "")
    .trim()

//now parse it

const parsedData = JSON.parse(cleanedText)

res.status(200).json({
      success : true,
      message : 'AI has given Q&A',
      data: parsedData
})

})


export const generateConceptExplanation = catchAsync(async(req , res , next)=>{

const {question} = req.body

if(!question){
    throw new AppError('Missing required field,"Question"  ',400)
}
    
const prompt = conceptExplanationPrompt(question)

const response = await ai.models.generateContent({
 
    model : 'gemini-3.5-flash',
    contents : prompt
})

let rawText = response.text

//let's clean the resp for our usecase
const cleanedText = rawText
    .replace(/^```\njson\s*/, "") 
    .replace(/```$/, "")
    .trim()

//now parse it

const parsedData = JSON.parse(cleanedText)

res.status(200).json({
      success : true,
      message : 'AI has given explanation ',
      data: parsedData
})




})





