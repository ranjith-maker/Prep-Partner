
export const BASE_URL = 'https://prep-partner-backend.onrender.com'


export const API_PATHS = {

AUTH :{
    SIGNUP : '/api/auth/signup' ,
    LOGIN : '/api/auth/login',
    LOGOUT : '/api/auth/logout',
    GET_PROFILE : '/api/auth/get-profile'
},


AI :{
  GENERATE_QUESTIONS : '/api/ai/generate-questions',
  GENERATE_EXPLANATIONS : '/api/ai/generate-explanations'
 
},

SESSION:{

    CREATE_SESSION : '/api/session/create-session',              //creating a new interview with Q&A
    GET_ALL_SESSION : '/api/session/get-allsessions',            // this goes in user's dashboard where all the session is ther
    GET_ONE_SESSION : (id) => `/api/session/get-session/${id}`,   //get session details with questions
    DELETE_SESSION : (id) => `/api/session/delete-session/${id}`  // delete a particular session

},


QUESTION :{
    ADD_TO_SESSION: '/api/question/addquestions',     //when user clicks load more
    PIN: (id) => `/api/question/pin/${id}` ,           //when user pins the question
    UPDATE_NOTE : (id) => `api/question/update/${id}`     //When user clicks learn more         

}



}













