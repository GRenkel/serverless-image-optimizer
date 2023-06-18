import { useState } from 'react';
import AuthContext from './AuthContext';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';

export default function AuthContextProvider({ children }) {
    const [userSession, setUserSession] = useState({ user: {}, isLogged: null })

    async function validateUserSession() {
        try {
            const { jwtToken, userData } = await CognitoAPIHelper.getCurrentUserSession()
            return !userSession.isLogged && createUserSession({ userData, jwtToken })
        } catch (error) {
            localStorage.clear();
            setUserSession(current => ({ ...current, isLogged: false }))
        }
    };

    function finishUserSession() {
        CognitoAPIHelper.userSignOut()
        setUserSession({ user: {}, isLogged: false })
    }

    async function createUserSession(userSessionData = {}) {

        let user = userSessionData.userData
        if (user === undefined) {
            const { jwtToken, userData } = await CognitoAPIHelper.getCurrentUserSession()
            user = userData
        }

        setUserSession({ user, isLogged: true })
    }

    return (
        <AuthContext.Provider
            value={{
                userSession,
                validateUserSession,
                createUserSession,
                finishUserSession
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
