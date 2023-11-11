import { 
    View, 
    Text, 
    StyleSheet,
    Alert
} from 'react-native';
import React, {useState} from 'react';

  /* Component imports */
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    /* States */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  /* Button Functionality */
    const handleSubmit = () => {
        try {
        setLoading(true)
        if (!email || !password){
            setLoading(false)
            Alert.alert('Please fill all fields')
            return;
        }
        setLoading(false)
        console.log('Register data : ', {email,password})
        } catch (error) {
        setLoading(false)
        console.log(error)
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.pageTitle}>{t('Login')}</Text>
        <View style={{marginHorizontal: 20}}>
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
            buttonTitle={t('Login')}
            loading={loading}
            handleSubmit={handleSubmit}
        />
        <Text style={styles.linkText}>
            {t('Not registered yet')} ? <Text style={styles.link}>{t('Register')}</Text>
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

export default Login