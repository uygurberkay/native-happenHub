import { View, Text, TextInput, StyleSheet , KeyboardTypeOptions } from 'react-native'
import React from 'react'
// @ts-ignore
import { Styles } from '../../constants/Color';

interface InputBoxProps {
    value: any;
    setValue: any;
    customStyle?: any;
    autoComplete?: any;
    inputTitle: string | undefined;
    secureTextEntry?: boolean | undefined;
    keyboardType?: KeyboardTypeOptions | undefined;
}

const InputBox= ({
    inputTitle, 
    keyboardType, 
    autoComplete, 
    secureTextEntry=false,
    value,
    setValue,
    customStyle,
}: InputBoxProps) => {
    return (
        <View>
            <Text>{inputTitle}</Text>
            <TextInput 
                style={customStyle ? customStyle : styles.inputBox}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text.toLowerCase())}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: Styles.colors.white,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        borderColor: Styles.colors.lightCharcoal,
        borderWidth: .4,
        elevation: 4,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
        color:'#af9f85'
    },
})

export default InputBox