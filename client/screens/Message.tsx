import { View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/authContext';
import FriendScreen from '../components/Messages/Friend/FriendScreen';
import NotificationScreen from '../components/Messages/Notification/NotificationScreen';
import ChatScreen from '../components/Messages/Chat/ChatScreen';
import Tabs from '../components/Ui/Tabs';
// @ts-ignore
import { Styles } from '../constants/Color';
import IconButton from '../components/Ui/IconButton';

const Message = ({navigation}:any) => {
    /* Global state */
    const { t } = useTranslation();
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;

    /* Local state */
    const tabs = ["Chat", "Friends", "Notifications"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${t('Message')}`,
            headerRight: () => (
                    <IconButton 
                        image={user.image}
                        color={Styles.colors.lightCharcoal}
                        onPress={() => {navigation.navigate('Profile')}}
                    />
                ),
        });
    }, []);

    const displayTabContent = () => {
        switch (activeTab) {
            case "Chat":
                return (
                    <View>
                        <ChatScreen />
                    </View>
                );
        
            case "Friends":
                return (
                    
                    <View>
                        <FriendScreen/>
                    </View>
                );
        
            case "Notifications":
                return (
                    
                    <View>
                        <NotificationScreen />
                    </View>
                );
        
            default:
                return null;
            }
    }


    /* Handle form data post  */
    // const handlePost = async () =>{
    //     try {
    //         setLoading(true);
    //         if (!title || !description) alert("Please fill all areas ");
    //         const { data } = await axios.post(
    //             '/post/create-post',
    //             { title, description}
    //         );
    //         setLoading(false);
    //         setPosts([...posts, data?.posts])
    //         alert(data?.message)
    //         navigation.navigate('Home')
    //     } catch (error: any) {
    //         alert(error?.response.data.message || error.message);
    //         setLoading(false);
    //         console.log(error);
    //     }
    // }
        
    return (
        <View style={styles.container}>
            <View>
                <View style={{backgroundColor: Styles.colors.lightCoral}}>
                    <View style={styles.tabContainer}>
                        <Tabs 
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </View>
                </View>
                <View>
                    {displayTabContent()}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: Styles.colors.sunray,
        // paddingRight: 24,
    },
    tabContainer: {
        width: '100%',

    },
    updateBtn: {
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Message