import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToken(savedToken);
        const userData = JSON.parse(savedUser)
        setUser(userData);
    }, [])

    const login = async (formData) => {
        const response = await fetch('http://localhost:5002/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const loginData = await response.json()
        if ('messages' in loginData) {
            return loginData.messages;
        } else {
            setToken(loginData.auth_token)
            setUser(loginData.user)

            localStorage.setItem('token', loginData.auth_token)
            localStorage.setItem('user', JSON.stringify(loginData.user))
            return '';
        }
    }

    const registerUser = async (registerData) => {
        const response = await fetch('http://localhost:5002/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })

        const responseData = await response.json();
        console.log(responseData);
    }

    const value = {
        token,
        user,
        login,
        registerUser,
        isAuthenticated: token ? true : false
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )

}
