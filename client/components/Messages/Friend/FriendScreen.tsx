import { View, Text, TextInput, ScrollView, Pressable, Platform } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../context/authContext';
import Friends from './Friends';

const FriendScreen = () => {
    /* Global state */
    const { t } = useTranslation();
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    /* Local state */
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const userId = user._id;

            /* Gets all the user except logged one */
            const response = await axios
                .get(`/auth/users/${userId}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log("error retrieving users", error);
                });
                };
            fetchUsers();
        }, []);
        // console.log("users ---> ", users);

    return (
        <View >
            <View style={{ padding: 10 }}>
                {users.map((item, index) => (
                    <Friends key={index} item={item} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default FriendScreen