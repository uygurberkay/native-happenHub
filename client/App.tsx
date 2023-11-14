import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Screens and Components */
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import LanguageSelector from './components/LanguageSelector';
import { AuthProvider } from './context/authContext';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{headerShown: false}}/>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{headerShown: false}}/>
            <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{headerShown: false}}/>
            {/* <StatusBar style="auto" /> */}
          </Stack.Navigator>
            <LanguageSelector />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
