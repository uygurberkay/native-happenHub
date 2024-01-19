import { StyleSheet, Text, View, Pressable, Image, ImageURISource, ImageRequireSource } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Styles } from "../../../constants/Color.android";

interface ItemProps {
    _id: String;
    name: String;
    email: String;
    image: any
}

interface NotificationProps {
    item?: ItemProps | null | undefined;
    friendRequests: any;
    setFriendRequests: any;
}

const Notifications = ({ item, friendRequests, setFriendRequests } : NotificationProps) => {
const [state, setState]: any = useContext(AuthContext);
const { user, token } = state;
const navigation = useNavigation();
const userId = user;
const { t } = useTranslation()

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
    <Pressable style={styles.pressableContainer}>
        <Image
            style={styles.imageContainer}
            source={{ uri: item?.image }}
        />
        <Text
            style={styles.text}
        >
            {item?.name} {t('sent you a friend request')}!
        </Text>

        <Pressable
            onPress={() => acceptRequest(item!._id)}
            style={styles.pressableInnerContainer}
        >
            <Text style={styles.innerText}>{t('Accept')}</Text>
        </Pressable>
    </Pressable>
);
};

export default Notifications;

const styles = StyleSheet.create({
    pressableContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    imageContainer: { 
        width: 50, 
        height: 50, 
        borderRadius: 25 
    },
    text: { 
        fontSize: 15, 
        fontWeight: "bold", 
        marginLeft: 10, 
        flex: 1 
    },
    pressableInnerContainer: { 
        backgroundColor: Styles.colors.bluePrimary, 
        padding: 10, 
        borderRadius: 6 
    },
    innerText: { 
        textAlign: "center",
        color: "white" 
    },
});
