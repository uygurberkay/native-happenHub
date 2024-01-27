import { View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import { Styles } from '../../../constants/Color';

import { AuthContext } from '../../../context/authContext';
import IconButton from '../../Ui/IconButton';
import Tabs from '../../Ui/Tabs';

const AgendaMessage = ({navigation}:any) => {
    /* Global state */
    const { t } = useTranslation();
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;

    /* Local state */
    const tabs = ["Event", "Chat"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)
    // console.log('ACTIVE TAB --> ', activeTab)
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
            case "Event":
                return (
                    <View>
                        {/* <ChatScreen /> */}
                    </View>
                );
            case "Chat":
                return (
                    <View>
                        {/* <FriendScreen/> */}
                    </View>
                );
            default:
                return null;
            }
    }
        
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

export default AgendaMessage