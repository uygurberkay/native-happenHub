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
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
// @ts-ignore
import { Styles } from "../../../constants/Color";
import InputView from "./InputView";
import MessageContainer from "./MessageContainer";
import { formatTime } from "../../../utils/formatTime";

const ChatMessagesScreen = () => {
  const [state, setState]: any = useContext(AuthContext);
  const { user, token } = state;
  const userId = user._id;
  const [selectedMessages, setSelectedMessages] = useState<any[]>([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const route = useRoute();
  const { recipientId } : any = route.params;
  const [message, setMessage] = useState("");

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
  const handleSend = async (messageType: String, imageUri: String | null ) => {
    try {
        const formData = new FormData();
        formData.append("senderId", userId);
        formData.append("recipientId", recipientId);

        //if the message type id image or a normal text
        if (messageType === "image") {
            formData.append("messageType", "image");
            formData.append("imageFile", {
                uri: imageUri,
                name: "image.jpg",
                type: "image/jpeg",
            } as any);
        } else {
            formData.append("messageType", "text");
            formData.append("messageText", message);
        }

        const response = await axios.post(
          "/message/send", 
          formData,
        );

        if (response.status === 200) {
            setMessage("");
            setSelectedImage("");

            fetchMessages();
        }
    } catch (error) {
        console.log("Error in sending the message", error);
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

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // // console.log(result);
    // if (!result.canceled) {
    //   handleSend("image", result?.uri);
    // }
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
        pickImage={pickImage}
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
