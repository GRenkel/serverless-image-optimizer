import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import Splash from '../../screens/Splash/Splash';


export default function AuthContextProvider({ children }) {
    const [userSession, setUserSession] = useState({ user: {}, isLogged: null })

    async function validateUserSession() {
        setUserSession(current => ({ ...current, isLogged: false }))
    };

    return (
        <AuthContext.Provider value={{ userSession, validateUserSession }}>
            {children}
        </AuthContext.Provider>
    );
}
