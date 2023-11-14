import { 
  View, 
  Text, 
  StyleSheet,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Component imports */
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';

/* Language imports */
import { useTranslation } from 'react-i18next';

const Register = ({navigation} : any) => {
  const { t } = useTranslation();
  /* States */
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /* Button Functionality */
  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (!name || !email || !password){
        setLoading(false)
        Alert.alert('Please fill all fields')
        return;
      }
      setLoading(false)
      const { data } = await axios.post(
        '/auth/register',
        { name, email, password}
      );
      alert(data && data.message)
      navigation.navigate('Login')
      console.log('Register data : ', {name, email,password})
    } catch (error: any) {
      alert(error?.response.data.message)
      setLoading(false)
      console.log(error)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{t('Register')}</Text>
      <View style={{marginHorizontal: 20}}>
        <InputBox 
          inputTitle={t('Name')}
          keyboardType={'default'}
          value={name}
          setValue={setName}
        />
        <InputBox 
          inputTitle={t('Email')}
          keyboardType={'email-address'}
          autoComplete={'email'}
          value={email}
          setValue={setEmail}
        />
        <InputBox 
          inputTitle={t('Password')}
          keyboardType={'number-pad'}
          autoComplete={'password'}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton 
        buttonTitle={t('Register')}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        {t('Already Register')} ? {' '}
        <Text 
          style={styles.link}
          onPress={() => navigation.navigate('Login')}>
          {t('Login')}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e1d5c9' // Change it later
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225', // Change it later
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color:'#af9f85'
  },
  linkText: {
    textAlign : 'center',
  },
  link: {
    color: '#359707'
  }
})

export default Register