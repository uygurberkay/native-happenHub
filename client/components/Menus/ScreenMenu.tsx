import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/authContext';

/* Screens and Components */
import Home from '../../screens/Home';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import LanguageSelector from '../LanguageSelector';
import HeaderMenu from './HeaderMenu';

const ScreenMenu = () => {
    /* Global state */
    const [state]: any = useContext(AuthContext);
    
    /* Auth condition */
    const authenticatedUser = state?.user && state?.token

    const Stack = createNativeStackNavigator()
    return (
        <>
            <Stack.Navigator initialRouteName={'Login'}>
                {authenticatedUser ? (
                <>
                    <Stack.Screen 
                        name="Home" 
                        component={Home} 
                        options={{
                            title: 'HappenHub',
                            headerRight: () => <HeaderMenu/>
                        }}/>
                </>
                ): (
                <>
                    <Stack.Screen 
                        name="Login" 
                        component={Login} 
                        options={{headerShown: false}}/>
                    <Stack.Screen 
                        name="Register" 
                        component={Register} 
                        options={{headerShown: false}}/>
                </>
                )}
            </Stack.Navigator>
            <LanguageSelector />
        </>
    );
}

export default ScreenMenu