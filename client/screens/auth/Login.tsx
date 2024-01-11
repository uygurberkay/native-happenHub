import { 
    View, 
    Text, 
    StyleSheet,
    Alert,
    Image
} from 'react-native';
import React, {useState, useContext} from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

  /* Component imports */
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import { useTranslation } from 'react-i18next';
import LogoContainer from '../../components/Ui/LogoContainer';
// @ts-ignore
import { Styles } from '../../constants/Color';

const Login = ({navigation} : any) => {
    /* Global State */
    const [state, setState] :any = useContext(AuthContext);

    const { t } = useTranslation();
    /* States */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  /* Button Functionality */
    const handleSubmit = async () => {
        try {
        setLoading(true)
        if (!email || !password){
            setLoading(false)
            Alert.alert('Please fill all fields')
            return;
        }
        setLoading(false)
        const { data } = await axios.post(
            '/auth/login',
            { email, password}
        );
        setState(data)
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        alert(data && data.message)
        navigation.navigate('Home')
        console.log('Login data : ', {email,password})
        } catch (error: any) {
            alert(error?.response.data.message)
            setLoading(false)
            // console.log(error)
        }
    };
    const getLocalStorageData = async () => {
        let data = await AsyncStorage.getItem('@auth')
        console.log('Local Storage ==> ',data)
    }
    getLocalStorageData()
    return (
        <View style={styles.outerContainer}>
            <View style={styles.headerContainer}>
                <LogoContainer 
                    displayText={true}/>
            </View>
            <View style={styles.innerContainer}>
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
                {t('Not registered yet')} ? {' '}
                <Text 
                    style={styles.link}
                    onPress={() => navigation.navigate('Register')}>
                    {t('Register')}
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
        flex:1,
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
        color: Styles.colors.bluePrimary,
    }
})

export default Login