import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Home = () => {
    const [state, setState]: any = useContext(AuthContext);
    return (
        <View>
            <Text>Home</Text>
            <Text>{JSON.stringify(state,null,4)}</Text>
        </View>
    )
}

export default Home