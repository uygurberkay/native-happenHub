import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'
// @ts-ignore
import { Styles } from '../../constants/Color';
import { useTranslation } from 'react-i18next';

interface NotificationComponentProps {
    bigTitle: String,
    smallTitle: String,
}

const NotificationComponent = ({bigTitle, smallTitle}: NotificationComponentProps) => {
    const { t } = useTranslation()
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.bigTitle}>{t(`${bigTitle}`)}</Text>
                <Text style={styles.smallTitle}>{t(`${smallTitle}`)}</Text>
            </View>
            <Switch
                trackColor={{false: Styles.colors.grey, true: Styles.colors.bluePrimary}}
                thumbColor={isEnabled ? Styles.colors.white : Styles.colors.white}
                ios_backgroundColor={Styles.colors.grey}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row' , 
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '80%', 
        padding: 16,
        backgroundColor: Styles.colors.sunray, 
        margin: 16,
        borderRadius: 8,
        /* Shadow */
        elevation: 6,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
    },
    bigTitle: {
        fontWeight: '600',
        fontSize: 18,
    },
    smallTitle: {
        fontWeight: '400',
        fontSize: 14
    },
})

export default NotificationComponent