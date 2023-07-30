import React ,{useState} from 'react';
import { loginContext } from './loginContext';
import axios from 'axios'

function UserLoginContextStore({children}) {

    let [currentUser,setCurrentUser]=useState({});
    let [error,setError]=useState("");
    let [userLoginStatus,setUserLoginStatus]=useState(false)

    //userlogin  these is useContext for using Mongo
    const loginUser=(userCredObj)=>{
        axios.post('http://localhost:3500/signin',userCredObj)
        .then(response=>{
            if(response.status===200){
                //updating  current User state
                setCurrentUser({...response.data.user})
                //updating user login status
                console.log("use context status upadted")
                setUserLoginStatus(true)
                //updating  error status
                setError("")
                
                localStorage.setItem("token",response.data.token)
                
            }else{
                setError(response.data.message)
            }
        })
        .catch(err=>{

        })
    }

    
    //userlogout
    const logoutUser=()=>{
        //to clear local or session storage
        localStorage.clear();
         //to update user login status
         setUserLoginStatus(false)

    }

  return (
   <loginContext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]}>
        {children}
   </loginContext.Provider>
  )
}

export default UserLoginContextStore