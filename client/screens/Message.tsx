import { View, Text, TextInput, ScrollView, Pressable, Platform } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PostContext } from '../context/postContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';
import Friends from '../components/Messages/Friends';

const Message = ({navigation}:any) => {
    /* Global state */
    const { t } = useTranslation();
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    /* Local state */
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)

    /* Handle form data post  */
    // const handlePost = async () =>{
    //     try {
    //         setLoading(true);
    //         if (!title || !description) alert("Please fill all areas ");
    //         const { data } = await axios.post(
    //             '/post/create-post',
    //             { title, description}
    //         );
    //         setLoading(false);
    //         setPosts([...posts, data?.posts])
    //         alert(data?.message)
    //         navigation.navigate('Home')
    //     } catch (error: any) {
    //         alert(error?.response.data.message || error.message);
    //         setLoading(false);
    //         console.log(error);
    //     }
    // }
    
    const [users, setUsers] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
            ),
            headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
                <MaterialIcons
                onPress={() => navigation.navigate("Friends")}
                name="people-outline"
                size={24}
                color="black"
                />
            </View>
            ),
        });
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const userId = user._id;
            console.log('User ID : ',userId)

            const response = axios
                .get(`/auth/users/${userId}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log("error retrieving users", error);
                });
                console.log(response)
                };
            fetchUsers();
        }, []);
        console.log("users", users);
        
    return (
        <View style={styles.container}>
            <View style={{ padding: 10 }}>
                {users.map((item, index) => (
                    <Friends key={index} item={item} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    inputBox: {
        backgroundColor: '#ffffff',
        textAlignVertical: 'top',
        paddingTop: 10,
        width: '90%',
        marginTop: 30,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 12,
    },
    postBtn: {
        width:'85%',
        marginTop: 30,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBtnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
    }
});

export default Message