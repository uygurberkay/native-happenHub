import { StyleSheet, Text, View ,ScrollView, Pressable} from "react-native";
import React, { useContext,useEffect,useState } from "react";
import Chat from "./Chat";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";


const ChatScreen = ({navigation}: any) => {
    const [acceptedFriends, setAcceptedFriends] = useState([]);
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const userId = user._id;
    useEffect(() => {
        const acceptedFriendsList = async () => {
            try {
                const response = await axios.get(
                    `/auth/accepted-friends/${userId}`
                );
            
                if (response.status === 200) {
                    const data = response.data;
                    setAcceptedFriends(data);
                }
            } catch (error) {
                console.log("Error showing the accepted friends", error);
            }
        };
        acceptedFriendsList();
    }, []);
    // console.log("Accepted Friends --> ",acceptedFriends)
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable>
                {acceptedFriends.map((item,index) => (
                    <Chat key={index} item={item} navigation={navigation}/>
                ))}
            </Pressable>
        </ScrollView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    
});
