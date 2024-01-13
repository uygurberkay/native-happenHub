import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import Notifications from "./Notifications";

interface FriendRequestProps {
    _id: String;
    name: String;
    email: String;
    image: String;
}

const NotificationScreen = () => {
const [state, setState]: any = useContext(AuthContext);
const { user, token } = state;
const [friendRequests, setFriendRequests] = useState([]);
const userId = user._id;

useEffect(() => {
    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(
                `/auth/friend-request/${userId}`
            );
        
            if (response.status === 200) {
                const friendRequestsData = response.data.map((friendRequest: FriendRequestProps) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                    image: friendRequest.image,
                }));
        
                setFriendRequests(friendRequestsData);
            }
        } catch (error) {
            console.log("Catch error ", error);
        }
    };
    fetchFriendRequests();
}, []);

console.log('Friend Request -->' , friendRequests);

return (
    <View style={{ padding: 10, marginHorizontal: 12 }}>
    {friendRequests.length > 0 ? 
        <Text>Your Friend Requests!</Text>
        :
        <Text>There is no friend Request</Text>
    }

    {friendRequests.map((item, index) => (
        <Notifications
            key={index}
            item={item}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
        />
    ))}
    </View>
);
};

export default NotificationScreen;

const styles = StyleSheet.create({});
