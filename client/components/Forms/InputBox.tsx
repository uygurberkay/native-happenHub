import { View, Text, TextInput, StyleSheet , KeyboardTypeOptions } from 'react-native'
import React from 'react'

interface InputBoxProps {
    value: any;
    setValue: any;
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
    setValue
}: InputBoxProps) => {
    return (
        <View>
            <Text>{inputTitle}</Text>
            <TextInput 
                style={styles.inputBox}
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
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color:'#af9f85'
    },
})

export default InputBox