import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    PersonalChat: { recipientId: string };

};

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PersonalChat'>;


const Chat = ({ item }: any) => {
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const userId = user._id;
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation<ChatScreenNavigationProp>();
    console.log(userId, ' and ', item._id)
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `/message/messages/${userId}/${item._id}`
                );
                const data = response.data;
                    // console.log('DATA ---> ',data)
                    console.log('RESPONSE --> ', response)
                if (response.status === 200) {
                    setMessages(data);
                } else {
                    console.log("Error showing messages", response.statusText);
                }
            } catch (error) {
                console.log("Error fetching messages", error);
            }
        };
        fetchMessages();
    }, []);
    console.log('MESSAGE --->', messages);

    const getLastMessage = () => {
        const userMessages = messages.filter(
        (message: any) => message?.messageType === "text"
        );

        const n = userMessages.length;

        return userMessages[n - 1];
    };
    const lastMessage = getLastMessage();
    console.log(lastMessage);
    const formatTime = (time : any) => {
        const options : any = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("tr-TR", options);
    };
    return (
        <Pressable
        onPress={() =>
            navigation.navigate("PersonalChat", {recipientId : item._id,})
        }
        style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderWidth: 0.7,
            borderColor: "#D0D0D0",
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            padding: 10,
        }}
        >
        <Image
            style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
            source={{ uri: item?.image }}
        />

        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
            <Text>{item._id}</Text>
            {lastMessage && (
            <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
                {lastMessage?.message}
            </Text>
            )}
        </View>

        <View>
            <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
            </Text>
        </View>
        </Pressable>
    );
};

export default Chat;

const styles = StyleSheet.create({});
