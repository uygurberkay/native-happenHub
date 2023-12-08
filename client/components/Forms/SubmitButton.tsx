import { 
    Text, 
    StyleSheet, 
    Pressable 
} from 'react-native'
import React from 'react'
/* Language imports */
import { useTranslation } from 'react-i18next';
// @ts-ignore
import { Styles } from '../../constants/Color';

interface SubmitBtnProps {
    loading?: boolean;
    textColor?: any;
    buttonColor?: any;
    handleSubmit?: any;
    buttonTitle?: string;
}

const SubmitButton = ({
    buttonTitle, 
    buttonColor= Styles.colors.bluePrimary, 
    textColor= Styles.colors.white, 
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
        height: 60,
        marginHorizontal: 25,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 8,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
    }
});

export default SubmitButton