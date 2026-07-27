import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { signInWithGoogle } from '../services/firebaseAuth';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchCurrentUser = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data);
        }
        catch {
            setUser(null);
            localStorage.removeItem('finmentor_token');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('finmentor_token');
        if (token) {
            fetchCurrentUser();
        }
        else {
            setLoading(false);
        }
    }, []);
    const login = async (username, password) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        const res = await api.post('/auth/login', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        localStorage.setItem('finmentor_token', res.data.access_token);
        await fetchCurrentUser();
    };
    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const firebaseUser = await signInWithGoogle();
            const idToken = await firebaseUser.getIdToken();
            const res = await api.post('/auth/google', { token: idToken });
            localStorage.setItem('finmentor_token', res.data.access_token);
            await fetchCurrentUser();
        }
        catch (error) {
            console.error("Firebase Login Error", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };
    const register = async (email, password, full_name, experience_level) => {
        await api.post('/auth/register', {
            email,
            password,
            full_name,
            experience_level,
            monthly_income_target: 3400.0,
        });
        await login(email, password);
    };
    const quickDemoLogin = async () => {
        setLoading(true);
        try {
            const res = await api.post('/auth/demo-login');
            localStorage.setItem('finmentor_token', res.data.access_token);
            await fetchCurrentUser();
        }
        finally {
            setLoading(false);
        }
    };
    const logout = () => {
        localStorage.removeItem('finmentor_token');
        setUser(null);
    };
    const refreshUser = async () => {
        await fetchCurrentUser();
    };
    return (<AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, quickDemoLogin, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
