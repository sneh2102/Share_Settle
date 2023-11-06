import { createContext, useEffect, useState, useContext, useReducer } from "react"; 
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,

} from 'firebase/auth';
import { auth } from "../firebase"

export const authContext=createContext();

const authReducer = (state, action)=>{
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload }
        case 'LOGOUT':
            return {user: null}
        default: 
            return state;
    }
}

export function AuthContextProvider({children}){
const [user,setUser]=useState();

const [state, dispatch] = useReducer(authReducer, { user: null
})
    function gSignIn()
    {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }
    function fSignIn() {
        const facebookAuthProvider =new FacebookAuthProvider();
        return signInWithPopup(auth,facebookAuthProvider)
    }
    useEffect(()=>{  
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser);

                
        });
        return ()=>{
            unsubscribe();
        }
    },[])
    return <authContext.Provider value={{user, gSignIn, fSignIn, ...state, dispatch}}>{children}</authContext.Provider>
}

export function useUserAuth(){
    return useContext(authContext);
}