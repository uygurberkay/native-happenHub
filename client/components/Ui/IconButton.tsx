import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
// @ts-ignore
import { Styles } from '../../constants/Color';

interface IconButtonProps {
    color: string | undefined;
    image: String | any;
    onPress : any;
}

const IconButton = ({color, image, onPress}: IconButtonProps) => {
    return (
        <Pressable 
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
            {image ? (
                    <Image style={styles.imageContainer} source={{uri: image}} />
                ) : (
                    <EvilIcons name="user" size={40} color={color} />
            )}
            </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 6,
        marginHorizontal: 24,
        marginVertical: 4,
    },
    imageContainer: { // Change it later
        width: 32,
        height: 32,
        borderRadius: 24,
        borderColor: Styles.colors.darkCharcoal,
        borderWidth: .5,
    },
    pressed: {
        opacity: .75,
        borderRadius: 100,
    },
})

export default IconButton