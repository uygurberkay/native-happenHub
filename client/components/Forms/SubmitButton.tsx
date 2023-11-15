import { 
    Text, 
    StyleSheet, 
    Pressable 
} from 'react-native'
import React from 'react'
/* Language imports */
import { useTranslation } from 'react-i18next';

interface SubmitBtnProps {
    loading?: boolean;
    textColor?: any;
    buttonColor?: any;
    handleSubmit?: any;
    buttonTitle?: string;
}

const SubmitButton = ({
    buttonTitle, 
    buttonColor='#1e2225', 
    textColor='#ffffff', 
    handleSubmit,
    loading
}: SubmitBtnProps) => {
    const { t } = useTranslation();
    return (
        <Pressable 
            style={{...styles.submitBtn, backgroundColor : `${buttonColor}`}}
            onPress={handleSubmit}
        >
            <Text style={{...styles.btnText, color: `${textColor}`}}>
                { loading ? t('Please wait...') : buttonTitle}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        height: 50,
        marginHorizontal: 25,
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
    }
});

export default SubmitButton