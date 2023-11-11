import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/auth/Register';
import LanguageSelector from './components/LanguageSelector';
import Login from './screens/auth/Login';

export default function App() {
  return (
    <>
      <Login />
      <LanguageSelector />
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  
});
