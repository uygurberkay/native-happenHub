import { StyleSheet, Text, View, Pressable, Image, ImageURISource, ImageRequireSource } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

interface ItemProps {
    _id: String;
    name: String;
    email: String;
    image: any
}

interface NotificationProps {
    item?: ItemProps | null | undefined;
    // friendRequests: () => void;
    // setFriendRequests: () => void;
    friendRequests: any;
    setFriendRequests: any;
}

const Notifications = ({ item, friendRequests, setFriendRequests } : NotificationProps) => {
const [state, setState]: any = useContext(AuthContext);
const { user, token } = state;
const navigation = useNavigation();
const userId = user;

const acceptRequest = async (friendRequestId: String) => {
    try {
        const response = await axios.post(
            "/auth/friend-request/accept",  
            {
                senderId: friendRequestId,
                recipientId: userId,
            }
        );

        if (response.status === 200) {
            /* Searches array to filter unmatch ids which means still on request array */
            friendRequests.filter((request: ItemProps) => request._id !== friendRequestId)
        }
    } catch (error) {
        console.log("Error accepting the friend request", error);
    }

};
return (
    <Pressable
    style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    }}
    >
    <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item?.image }}
    />

    <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
    >
        {item?.name} sent you a friend request!!
    </Text>

    <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
    >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
    </Pressable>
    </Pressable>
);
};

export default Notifications;

const styles = StyleSheet.create({});
