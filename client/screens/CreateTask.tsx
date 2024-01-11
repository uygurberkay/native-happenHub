import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';

const CreateTask = () => {
    const [state, setState]: any = useContext(AuthContext);

    return (
        <View style={styles.container}>

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