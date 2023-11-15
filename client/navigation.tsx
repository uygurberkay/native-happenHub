import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/authContext'
import ScreenMenu from './components/Menus/ScreenMenu'

const RootNavigation = () => {
    return (
        <AuthProvider>
            <ScreenMenu/>
            <StatusBar style='auto'/>
        </AuthProvider>
    )
}

export default RootNavigation