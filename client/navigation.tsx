import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/authContext'
import { PostProvider } from './context/postContext';
import ScreenMenu from './components/Menus/ScreenMenu'

const RootNavigation = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <ScreenMenu/>
                <StatusBar style='auto'/>
            </PostProvider>
        </AuthProvider>
    )
}

export default RootNavigation