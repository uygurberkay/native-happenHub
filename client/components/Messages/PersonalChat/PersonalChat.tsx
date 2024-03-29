import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState, useContext, useLayoutEffect, useEffect,useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
// @ts-ignore
import { Styles } from "../../../constants/Color";
import InputView from "./InputView";
import MessageContainer from "./MessageContainer";
import { formatTime } from "../../../utils/formatTime";

const ChatMessagesScreen = () => {
  /* Authentication */
  const [state, setState]: any = useContext(AuthContext);
  const { user, token } = state;
  const userId = user._id;

  /* Local States */
  const [selectedMessages, setSelectedMessages] = useState<any[]>([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  
  /* React-base Variables */
  const navigation = useNavigation();
  const route = useRoute();
  const { recipientId } : any = route.params;
  const scrollViewRef = useRef<any>(null);
  
  /* ScrollToBottom Functionality */
  const scrollToBottom = () => {
      if(scrollViewRef.current){
          scrollViewRef.current.scrollToEnd({animated:false})
      }
  }
  /* Gets messages between userId and recipientId */
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `message/messages/${userId}/${recipientId}`
        );
        const data = response.data;
    
        if (response.status === 200) {
            setMessages(data);
        } else {
            console.log("Error showing messages", response.statusText);
        }
    } catch (error) {
        console.log("Error fetching messages", error);
    }
    };

  useEffect(() => {
    scrollToBottom()
  },[]);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    /* Gets userDetails from entered userID */
    const fetchRecipientData = async () => {
      try {
        const response = await axios.get(
          `/auth/user/${recipientId}`
        );
        const data = response.data;
        
        setRecepientData(data);
    } catch (error) {
        console.log("Error retrieving details", error);
    }
    };
    fetchRecipientData();
  }, []);

  /* Handles Send Messages Functionality  */

  const handleSend = async (messageType: any, imageUri: any) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recipientId", recipientId);

      formData.append("messageType", "text");
      formData.append("messageText", message);

      const response = await fetch("https://happenhub-backend.onrender.com/api/v1/message/send", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("");
        setSelectedImage("");

        fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };


  // console.log("messages", selectedMessages);

  /* Adjusts TopNavigation */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {backgroundColor : Styles.colors.lightCoral},
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color={Styles.colors.lightCharcoal}
          />

          {/*  */}
          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                // @ts-ignore
                source={{ uri: recepientData?.image }}
              />

              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {/* @ts-ignore */}
                {recepientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null,
    });
  }, [recepientData, selectedMessages]);

  const deleteMessages = async (messageIds : any) => {
    try {
      const response = await axios.post(
        "/message/deleteMessages", 
        {
          messages: messageIds
        }
      );
  
      if (response.status === 200) {
          setSelectedMessages((prevSelectedMessages) =>
              prevSelectedMessages.filter((id) => !messageIds.includes(id))
          );
  
          fetchMessages();
      } else {
          console.log("Error deleting messages", response.status);
      }
  } catch (error) {
      console.log("Error deleting messages", error);
  }
  };


  const handleSelectMessage = (message: any) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };
  return (
    <KeyboardAvoidingView 
      style={styles.outerContainer}>
      <ScrollView 
        ref={scrollViewRef} 
        contentContainerStyle={{flexGrow:1}} 
        onContentSizeChange={scrollToBottom}
      >

        {/* Text and Image Box */}
        <MessageContainer 
          userId={userId}
          messages={messages}
          selectedMessages={selectedMessages}
          handleSelectMessage={handleSelectMessage}
          formatTime={formatTime}
        />
      </ScrollView>

      {/* Text and Image Send INPUT PANEL */}
      <InputView 
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
      />

    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({
  outerContainer: { 
    flex: 1, 
    backgroundColor: Styles.colors.sunray 
  },
});
