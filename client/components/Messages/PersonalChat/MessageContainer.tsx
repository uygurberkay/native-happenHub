import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Styles } from '../../../constants/Color.android';

interface MessageContainer {
    messages: any;
    selectedMessages: any;
    handleSelectMessage: any;
    userId: String;
    formatTime: any;
}

const MessageContainer = ({messages, selectedMessages, handleSelectMessage, userId, formatTime}: MessageContainer) => {
    return (
        <View>
            {/* Maps all messages (Text, Images) */}
            {messages.map((item: any, index: any) => {

            /* MessageType TEXT */
            if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
                <Pressable
                    onLongPress={() => handleSelectMessage(item)}
                    key={index}
                    style={[
                        /* Checks who send messages */
                        item?.senderId?._id === userId
                        ? styles.senderBoxContainer
                        : styles.recipientBoxContainer,

                        /* Selected MessageBox */
                        isSelected && styles.selectedBox,
                    ]}
                    >
                    <Text style={{ fontSize: 13, textAlign: isSelected ? "right" : "left" }} >
                        {item?.message}
                    </Text>
                    <Text style={styles.timeText} >
                        {formatTime(item.timeStamp)}
                    </Text>
                </Pressable>
            );
            }
            /* MessageType IMAGE */
            if (item.messageType === "image") {
            const baseUrl =
                "/Users/sujananand/Build/messenger-project/api/files/"; // ŞUNU DEĞİŞTİR
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const source = { uri: baseUrl + filename };
            return (
                <Pressable
                key={index}
                style={[
                    /* Checks who send messages */
                    item?.senderId?._id === userId
                    ? styles.senderBoxContainer
                    : styles.recipientBoxContainer
                ]}
                >
                <View>
                    <Image
                    source={source}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                    />
                    <Text style={styles.imageTimeText} >
                    {formatTime(item?.timeStamp)}
                    </Text>
                </View>
                </Pressable>
            );
            }
            })}
        </View>
    )
}

export default MessageContainer


const styles = StyleSheet.create({
    outerContainer: { 
        flex: 1, 
        backgroundColor: Styles.colors.sunray 
    },
    senderBoxContainer: {
        alignSelf: "flex-end",
        backgroundColor: Styles.colors.bluePrimary,
        padding: 8,
        maxWidth: "60%",
        borderRadius: 7,
        margin: 10,
    },
    recipientBoxContainer: {
        alignSelf: "flex-start",
        backgroundColor: Styles.colors.lightGray,
        padding: 8,
        margin: 10,
        borderRadius: 7,
        maxWidth: "60%",
    },
    selectedBox: { 
        width: "100%", 
        backgroundColor: Styles.colors.blueSecondary, 
    },
    timeText: {
        textAlign: "right",
        fontSize: 9,
        color: "gray",
        marginTop: 5,
    },
    imageTimeText: {
        textAlign: "right",
        fontSize: 9,
        position: "absolute",
        right: 10,
        bottom: 7,
        color: "white",
        marginTop: 5,
    },
});