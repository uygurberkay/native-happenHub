import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
// @ts-ignore
import { Styles } from '../constants/Color'
import { useTranslation } from 'react-i18next'

interface LogoContainerProps {
    displayText: boolean,
}

const LogoContainer = ({displayText}: LogoContainerProps) => {
    const { t } = useTranslation()
    const {height, width} = useWindowDimensions()
    console.log(height)
    let pTop = 60;
    if(height > 700) {
        pTop = 100;
    }
    return (
        <View style={{...styles.container, paddingTop: pTop}}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/Logo.png')}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>HappenHub</Text>
                {displayText && (
                    <Text style={styles.text}>{t('Want to create an event that can watch what you are doing?')}</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : 'white',
        elevation: 4,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        paddingTop: 16,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Styles.colors.lightcharcoal,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 60,
        paddingVertical: 16,
    },
})

export default LogoContainer