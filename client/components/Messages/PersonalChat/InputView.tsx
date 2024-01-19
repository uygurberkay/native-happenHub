import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo, AntDesign } from "@expo/vector-icons";
// @ts-ignore
import { Styles } from '../../../constants/Color';

interface  InputViewProps {
  message: any;
  setMessage: any;
  pickImage: any;
  handleSend: any;
}

const InputView = ({message, setMessage, pickImage, handleSend}: InputViewProps) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.textInputContainer}
            value={message}
            onChangeText={(text) => setMessage(text)}
            />
            <View style={styles.inputContainerView}>
            {/* <Entypo onPress={pickImage} name="camera" size={24} color="gray" /> */}
            </View>

            <Pressable
            onPress={() => handleSend("text", null)}
            style={styles.inputContainerSend}
            >
            <AntDesign name="arrowup" size={20} color={Styles.colors.sunray} />
            </Pressable>
        </View>
    )
}

export default InputView


const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor:  Styles.colors.lightCoral,
    },
    textInputContainer: {
      flex: 1,
      height: 40,
      borderWidth: .5,
      borderColor: Styles.colors.grey,
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    inputContainerView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginHorizontal: 8,
    },
    inputContainerSend: {
      backgroundColor: Styles.colors.bluePrimary,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 20,
    }
  });
  