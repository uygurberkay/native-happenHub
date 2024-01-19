import { View, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Feather} from '@expo/vector-icons';
// @ts-ignore
import { Styles } from '../../constants/Color';

interface EditButtonProps {
    onPress: any;
    icon: any;
}

const EditButton = ({onPress, icon}: EditButtonProps) => {
    return (
        <View>
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [
                { backgroundColor: pressed ? Styles.colors.blueSecondary : Styles.colors.bluePrimary},
                styles.pressButton,
                ]}
        >
            <Feather name={icon} size={24} color={Styles.colors.white} />
        </Pressable>
        </View>
    )
}

export default EditButton


const styles = StyleSheet.create({
    pressButton: {
        height: 40,
        width: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});