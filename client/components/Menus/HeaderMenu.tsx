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

const HeaderMenu = () => {
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
            <Pressable onPress={handleLogout}>
                <FontAwesome5 
                    name='sign-out-alt' 
                    style={{...styles.iconStyle, color: 'red'}} 
                />
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
});

export default HeaderMenu