/**
 * ProtectedRoute Component:
 * This component represents a protected route that allows rendering its children only if the user is authenticated.
 * Utilizes the useUserAuth custom hook to access user authentication information.
 * If the user is not authenticated, it navigates them to the home page ("/").
 */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../../Context/AuthContext';

/**
 * ProtectedRoute Functional Component:
 * @param {Object} props - The props for this component.
 *   @property {JSX.Element} children - The child components to be rendered if the user is authenticated.
 */
const ProtectedRoute = ({children}) => {
    let { user } =useUserAuth();
    
    /**
     * Render Method:
     * Renders the JSX structure of the ProtectedRoute component.
     * If the user is not authenticated, it navigates them to the home page ("/").
     * Otherwise, it renders the provided children components.
     * @returns {JSX.Element} - The JSX structure representing the ProtectedRoute.
     */
    if(!user ){
        return <Navigate to="/"/>
    }
    return children;
};

// Exporting the ProtectedRoute component as the default export.
export default ProtectedRoute;