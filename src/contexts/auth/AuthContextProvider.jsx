import { useState } from 'react';
import AuthContext from './AuthContext';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';

export default function AuthContextProvider({ children }) {
    const [userSession, setUserSession] = useState({ user: {}, isLogged: null })

    async function validateUserSession() {
        const {jwtToken, userData} = await CognitoAPIHelper.getCurrentUserSession()
        
        if(!userSession.isLogged || jwtToken === undefined){
            setUserSession(current => ({ ...current, isLogged: false }))
            return
        }

        return createUserSession(userData, jwtToken)
    };

    async function createUserSession(user, jwtToken) {
        setUserSession({ user, isLogged: true })
    }

    return (
        <AuthContext.Provider value={{ userSession, validateUserSession, createUserSession }}>
            {children}
        </AuthContext.Provider>
    );
}
