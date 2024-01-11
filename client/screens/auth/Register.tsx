import { 
  View, 
  Text, 
  StyleSheet,
  Alert,
  useWindowDimensions
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Component imports */
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';

/* Language imports */
import { useTranslation } from 'react-i18next';
import LogoContainer from '../../components/Ui/LogoContainer';
// @ts-ignore
import { Styles } from '../../constants/Color';

const Register = ({navigation} : any) => {
  const { t } = useTranslation();
  const { height } = useWindowDimensions()
  /* States */
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let display = false;
  if(height > 700) {
    display = true;
  }

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
      // console.log(error)
    }
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <LogoContainer 
          
          displayText={display}/>
      </View>
      <View style={styles.innercontainer}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Styles.colors.lightCoral,
  },
  headerContainer: {
      flex: 1,
  },
  innerContainer: {
      justifyContent: 'center',
      borderRadius: 40,
      paddingVertical: 24,
      backgroundColor: Styles.colors.white,
  },
  innercontainer: {
    justifyContent: 'center',
    borderRadius: 40,
    paddingVertical: 24,
    backgroundColor: Styles.colors.white,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Styles.colors.lightcharcoal,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: Styles.colors.white,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: Styles.colors.textGrey,
  },
  linkText: {
    textAlign : 'center',
  },
  link: {
    color: Styles.colors.bluePrimary,
  }
})

export default Register