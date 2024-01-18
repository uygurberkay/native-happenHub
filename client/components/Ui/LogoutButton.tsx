import { 
    View, 
    Text, 
    Pressable, 
    StyleSheet 
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import { Styles } from '../../constants/Color';

const LogoutButton = () => {
    const { t } = useTranslation()
    const [state, setState]: any = useContext(AuthContext);

    /* Logout */
    const handleLogout = async () => {
        setState({token: '', user: null});
        await AsyncStorage.removeItem('@auth');
        alert(t('Logout Successful'))
    }

    return (
        <View style={styles.container}>
            <Pressable 
                onPress={handleLogout}
                style={({pressed}) => [
                    { backgroundColor: pressed ? Styles.colors.lightCharcoal : Styles.colors.redLight},
                    styles.updateBtn,
                    ]}
            >
                <Text style={styles.updateBtnText}>
                    {t('Logout')} 
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,
    },
    updateBtn: {
        height: 50,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateBtnText: {
        color: Styles.colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
});

export default LogoutButton