/**
 * AuthContext Module:
 * This module provides context and functions related to user authentication.
 * It utilizes Firebase authentication methods and the React context API.
 */

// Importing necessary dependencies from React and Firebase.
import { createContext, useEffect, useState, useContext, useReducer } from "react"; 
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,

} from 'firebase/auth';
import { auth } from "../firebase"

export const authContext=createContext();

// Reducer function for handling authentication state changes.
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

/**
 * AuthContextProvider Component:
 * Provides the authentication context for the entire application.
 * Manages user authentication state and actions using the useReducer hook.
 */
export function AuthContextProvider({children}){
const [user,setUser]=useState();

const [state, dispatch] = useReducer(authReducer, { user: null
})
    // Function to sign in using Google authentication.
    function gSignIn()
    {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
        
    }

    // Function to sign in using Facebook authentication.
    function fSignIn() {
        const facebookAuthProvider =new FacebookAuthProvider();
        return signInWithPopup(auth,facebookAuthProvider)
    }

    // Effect hook to subscribe to authentication state changes.
    useEffect(()=>{  
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser);

                
        });

        // Cleanup function to unsubscribe when the component unmounts.
        return ()=>{
            unsubscribe();
        }
    },[])
    // Providing the authentication context and actions to the wrapped components.
    return <authContext.Provider value={{user, gSignIn, fSignIn, ...state, dispatch}}>{children}</authContext.Provider>
}

/**
 * useUserAuth Hook:
 * A custom hook to conveniently access the authentication context.
 * @returns {Object} - The authentication context and actions.
 */
export function useUserAuth(){
    return useContext(authContext);
}