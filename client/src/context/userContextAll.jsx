
import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { API_PATHS, BASE_URL } from "../utils/apiPaths";

export const userDataContext = createContext()



export default function UserContextAll({children}) {

const [appLoading, setAppLoading] = useState(true);
const [userDetails, setUserdetails] = useState(null);


useEffect(()=>{

const controller = new AbortController();

async function PersistUser(){

try {

const response = await axios.get(
 `${BASE_URL}${API_PATHS.AUTH.GET_PROFILE}`,
 {
   withCredentials:true,
   signal:controller.signal
 }
);

setUserdetails(response.data?.data);

}
catch(error){
// !true false so this code is skipped because nothing actually went wrong you intentionally cancelled the request.
if(!axios.isCancel(error)){
 console.error(error.response?.data?.message);
 setUserdetails(null);
}

}
finally{
 setAppLoading(false);
}

}

PersistUser();


return ()=>{
 controller.abort();
}

},[])

const value = {
    appLoading, 
    userDetails, setUserdetails 
}

return (
<userDataContext.Provider  value={value} >
{children}
</userDataContext.Provider>
)

}






