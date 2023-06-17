import { useState } from 'react';
import AuthContext from './AuthContext';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';

export default function AuthContextProvider({ children }) {
    const [userSession, setUserSession] = useState({ user: {}, isLogged: null })

    async function validateUserSession() {
        const { jwtToken, userData } = await CognitoAPIHelper.getCurrentUserSession()
        debugger
        if (!userSession.isLogged && jwtToken === undefined) {
            return setUserSession(current => ({ ...current, isLogged: false }))
        }

        return  !userSession.isLogged && createUserSession({ userData, jwtToken })
    };

    async function createUserSession(userSessionData = {}) {
        let user = userSessionData.userData
        debugger
        if(user === undefined){
            const { jwtToken, userData } = await CognitoAPIHelper.getCurrentUserSession()
            user = userData 
        }

        setUserSession({ user, isLogged: true })
    }

    return (
        <AuthContext.Provider value={{ userSession, validateUserSession, createUserSession }}>
            {children}
        </AuthContext.Provider>
    );
}
