import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import FooterMenu from '../components/Menus/FooterMenu';
import { AuthContext } from '../context/authContext';
import { BlurView } from 'expo-blur';

const CreateTask = () => {
    const [state, setState]: any = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <BlurView>
            </BlurView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'purple',
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
    },

});

export default CreateTask