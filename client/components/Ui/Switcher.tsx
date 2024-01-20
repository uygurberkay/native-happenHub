import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
// @ts-ignore
import { Styles } from '../../constants/Color';
import { useTranslation } from 'react-i18next';

interface SwitcherProps{
    isEnabled: boolean;
    setIsEnabled: any;
}

const Switcher = ({isEnabled, setIsEnabled}:SwitcherProps) => {
    const { t } = useTranslation()
    const toggleSwitch = () => {
        setIsEnabled((previousState: boolean) => !previousState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('Private')}</Text>
            <Switch
                trackColor={{ false: Styles.colors.redLight, true: Styles.colors.bluePrimary }}
                thumbColor={isEnabled ? Styles.colors.lightCharcoal : Styles.colors.waves}
                ios_backgroundColor={Styles.colors.redLight}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Text style={styles.text}>{t('Public')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 6,
        paddingLeft: 12,
        gap: 4,
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
    },
});

export default Switcher;
