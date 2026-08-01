
The User Behaviour , based on this we can make schema designing , frontend flow , based on backend routes. this is rough one, we can make changes as we needed

User comes to landing page , 
clicks signup/login in header
Modal opens shows login , I get only 3 details if new user, name, email, password
for login 2, email, password

As soon as he logs in . he goes to dashboard page where he can create the session and thats where he can also see previously created session as well

He clicks the + icon and modal opens, this is where user enters his details like
role, exp, topics, description, once he clicks create session , The API call goes to Gemini AI and gets all this info and now creates 5 Q/A as soon as I get the response from gemini, I'll store them in DB by making another post call and update my question Model and in frontend I navigate the user to the Interview page
There he can see all the Q/A neatly 


2 options here
1)he can click Learn more, API call goes to AI and fetches for that specific question it shows in frontend .
2) he can  pin and unpin the question we can simply put it at the top if he pins it .



so it can be 3 models for 
userdetails, name, email, password
session details ,role, exp, topics, description,
question details, ques, answer, pinned ques 











