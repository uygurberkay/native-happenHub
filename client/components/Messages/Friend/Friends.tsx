    import { StyleSheet, Text, View, Pressable, Image } from "react-native";
    import React, { useContext, useState, useEffect } from "react";
    import { AuthContext } from "../../../context/authContext";
    import axios from "axios";

    interface UserProps {
        item: {
            _id: String;
            name: String;
            email: String;
            password: String;
            image: any;
            role: String;
            friendRequests: String[];
            friends: String[];
            sentFriendRequests: String[];
            createdAt: Date;
            updatedAt: Date;
        }
    }

    const User = ({ item }: UserProps) => {
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const [requestSent, setRequestSent] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const userId = user._id;
        console.log(userId)
    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                /* Gets all friend request send to spesific userID */
                const response = await axios.get(
                    `/auth/friend-requests/sent/${userId}`
                );

                const data = response.data;
                if (response.status === 200) {
                    setFriendRequests(data);
                } else {
                    console.log("error", response.status);
                }
                console.log('Data --> ', data);
            } catch (error) {
                console.log("error", error);
            }
        };
    
        fetchFriendRequests();
    }, []);

    useEffect(() => {
        const fetchUserFriends = async () => {
            try {
                const response = await axios.get(
                    `/auth/friends/${userId}`
                );
            
                const data = response.data;
                if (response.status === 200) {
                    setUserFriends(data);
                } else {
                    console.log("error retrieving user friends", response.status);
                }
            } catch (error) {
                console.log("Error message", error);
            }
        };

        fetchUserFriends();
    }, []);

    const sendFriendRequest = async (currentUserId: any, selectedUserId: any) => {
        console.log(currentUserId, ' and ', selectedUserId);
    
        try {
            const response = await axios.post(
                "/auth/friend-request",  
                {
                    currentUserId,
                    selectedUserId,
                }
            );
    
            if (response.status === 200) {
                setRequestSent(true);
            }
        } catch (error) {
            console.log("error message", error);
        }
    };

    // console.log("friend requests sent", friendRequests);
    console.log("user friends", userFriends);
    return (
        <Pressable
        style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
        >
        <View>
            <Image
            style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
            }}
            source={{ uri: item.image }}
            />
        </View>

        <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
            <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
        </View>     
        {userFriends.includes(item._id) ? (
            <Pressable
            style={{
                backgroundColor: "#82CD47",
                padding: 10,
                width: 105,
                borderRadius: 6,
            }}
            >
            <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
            </Pressable>
        ) : requestSent || friendRequests.some((friend) => friend._id === item._id) ? (
            <Pressable
            style={{
                backgroundColor: "gray",
                padding: 10,
                width: 105,
                borderRadius: 6,
            }}
            >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
                Request Sent
            </Text>
            </Pressable>
        ) : (
            <Pressable
            onPress={() => sendFriendRequest(userId, item._id)}
            style={{
                backgroundColor: "#567189",
                padding: 10,
                borderRadius: 6,
                width: 105,
            }}
            >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
                Add Friend
            </Text>
            </Pressable>
        )}
        </Pressable>
    );
    };

    export default User;

    const styles = StyleSheet.create({});
