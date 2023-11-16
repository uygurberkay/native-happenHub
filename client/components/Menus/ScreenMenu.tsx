import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/authContext';

/* Screens and Components */
import Home from '../../screens/Home';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import LanguageSelector from '../LanguageSelector';
import HeaderMenu from './HeaderMenu';
import Post from '../../screens/Post';
import About from '../../screens/About';
import Account from '../../screens/Account';
import MyPosts from '../../screens/MyPosts';

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
                    <Stack.Screen 
                        name="Post" 
                        component={Post} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu/>
                        }}/>
                    <Stack.Screen 
                        name="About" 
                        component={About} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu/>
                        }}/>
                    <Stack.Screen 
                        name="MyPosts" 
                        component={MyPosts} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu/>
                        }}/>
                    <Stack.Screen 
                        name="Account" 
                        component={Account} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu/>
                        }}/>
                    <Stack.Screen 
                        name="Language" 
                        component={LanguageSelector} 
                        options={{
                            headerBackTitle: 'Back',
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
        </>
    );
}

export default ScreenMenu