import { useState } from 'react';
import AuthContext from './AuthContext';

export default function AuthContextProvider({ children }) {
    const [userSession, setUserSession] = useState({ user: {}, isLogged: null })

    async function validateUserSession() {
        setUserSession(current => ({ ...current, isLogged: false }))
    };

    async function createUserSession(userData){

    }

    return (
        <AuthContext.Provider value={{ userSession, validateUserSession, createUserSession }}>
            {children}
        </AuthContext.Provider>
    );
}
