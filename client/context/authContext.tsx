import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
/* Context */

const AuthContext = createContext()

/* Provider */
const AuthProvider = ({children}: any) => {
    // Global state
    const [state, setState] = useState({
        user: null,
        token: '',
    })

    // Initial local storage data
    useEffect(() => {
        const loadLoaclStorageData = async () => {
            let data: any = await AsyncStorage.getItem("@auth");
            let loginData = JSON.parse(data);
    
            setState({ ...state, user: loginData?.user, token: loginData?.token });
        };
        loadLoaclStorageData();
    }, []);
    
    let token = state && state.token;

    // Default axios settings
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = 'http://192.168.1.106:4000/api/v1';

    return (
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}