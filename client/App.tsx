import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Screens and Components */
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import LanguageSelector from './components/LanguageSelector';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
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
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
