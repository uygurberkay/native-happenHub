import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import { useTranslation } from 'react-i18next';

const Account = () => {
    const [state, setState]: any = useContext(AuthContext);
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text>{t('Name')} : {state?.user.name}</Text>
            <Text>{t('Email')} : {state?.user.email}</Text>
            <Text>{t('Role')} : {state?.user.role}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <FooterMenu/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
    },
});

export default Account