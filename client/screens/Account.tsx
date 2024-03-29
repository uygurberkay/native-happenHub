import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView, useWindowDimensions, Modal, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LogoutButton from '../components/Ui/LogoutButton';
import { Feather, MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons';

// @ts-ignore
import { Styles } from '../constants/Color';
import { formattedDate } from '../utils/formatTime';
import i18next from 'i18next';
import { languageResources } from '../services/i18next';
import languagesList from '../services/languagesList.json';
import EditButton from '../components/Ui/EditButton';

/* TypeScript Definitions */
type Language = {
    name: string;
    nativeName: string;
};
type Languages = Record<string, Language>;

interface LanguageTypes<T> {
    languagesList?: T;
}



const Account: React.FC<LanguageTypes<Languages>>  = () => {
    /* Global state */
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    /* Local state */
    const [name, setName] = useState<string>(user?.name);
    const [phone, setPhone] = useState<string>(user?.phone);
    const [email, setEmail] = useState<string>(user?.email);
    const [password, setPassword] = useState<string>(user?.password);
    const [loading, setLoading] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const [image, setImage] = useState<string>(user?.image);

    const {height} = useWindowDimensions();

    /* Handle Image Edit Functionality */
    const handleImageEdit = () => {
        // Will be done after Message page
    }

    /* Handle Editable Functionality */
    const handleEditability = () => {
        setEditable(!editable);
    }

    /* Gandle Language Selection */
    const changeLng = (lng: string) => {
        i18next.changeLanguage(lng);
        setVisible(false);
    };

    /* Handle update user data */
    const handleUpdate = async () => {
        try {
            setLoading(true)
            const {data} = await axios.patch(
                '/auth/update-user',
                {
                    name, password, email, phone, image,
            });
            setLoading(false)
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser });
            alert(data && data.message);
        } catch (error: any) {
            alert(error?.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }

    let adjustedScreen;
    if(height > 700) {
        adjustedScreen = '45%';
    }else {
        adjustedScreen = '35%';
    }

    return (
        <View style={{flex:1 ,backgroundColor: Styles.colors.white,}}>
            <View style={styles.container}>
                {/* Profile Photo */}
                <View style={styles.imageContainer}>
                    <View style={styles.imageBoxContainer}>
                        <Image 
                            source={{ uri: image }}
                            style={styles.imageBox}
                        />
                        <View style={styles.editButtonContainer}>
                            <EditButton onPress={handleImageEdit} icon={'image'}/>
                        </View>
                    </View>
                    <Text style={styles.userName}>{name}</Text>
                    <View style={styles.locationContainer}>
                        <View style={{flexDirection: 'row', alignItems: "center", gap: 4}}>
                            <Entypo name="location-pin" size={24} color={Styles.colors.bluePrimary} />
                            <Text>{user.location}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: "center", gap: 4}}>
                            <AntDesign name="tagso" size={24} color={Styles.colors.bluePrimary} />
                            <Text>{user.role}</Text>
                        </View>
                    </View>
                </View>

                {/* Profile Info */}
                {/* @ts-ignore */}
                <ScrollView style={[styles.boxContainer,{height: adjustedScreen}]}>

                    {/* Phone */}
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20, }}>
                        <Feather name="phone" size={24} color={Styles.colors.bluePrimary} />
                            <View>
                                <Text style={styles.elementGap}>{t('Phone Number')}</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={editable ? styles.editableInputBox : styles.nonEditableInputBox}
                                        editable={editable}
                                        keyboardType='phone-pad'
                                        value={phone}
                                        onChangeText={(text) => setPhone(text)}
                                    />
                                </View>
                            </View>
                        </View>
                        <EditButton onPress={handleEditability} icon={'edit'}/>
                    </View>
                    {/* Email */}
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20, }}>
                            <Feather name="mail" size={24} color={Styles.colors.bluePrimary} />
                            <View>
                                <Text style={styles.elementGap}>{t('Email')}</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={editable ? styles.editableInputBox : styles.nonEditableInputBox}
                                        editable={editable}
                                        keyboardType='default'
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                </View>
                            </View>
                        </View>
                        <EditButton onPress={handleEditability} icon={'edit'}/>
                    </View>
                    {/* Password */}
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20, }}>
                            <Entypo name="key" size={24} color={Styles.colors.bluePrimary}  />
                            <View>
                                <Text style={styles.elementGap}>{t('Password')}</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={editable ? styles.editableInputBox : styles.nonEditableInputBox}
                                        editable={editable}
                                        keyboardType='phone-pad'
                                        value={password}
                                        secureTextEntry={true}
                                        placeholder='************'
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                </View>
                            </View>
                        </View>
                        <EditButton onPress={handleEditability} icon={'edit'}/>
                    </View>
                    {/* Last Update */}
                    <View style={styles.profileContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20, }}>
                        <MaterialIcons name="update" size={24} color={Styles.colors.bluePrimary} />
                            <View>
                                <Text style={styles.elementGap}>{t('Last Update')}</Text>
                                <Text>{formattedDate(user.updatedAt)}</Text>
                            </View>
                    </View>
                    </View>
                </ScrollView>
                <View >
                {/* Language Pop-up */}
                <Modal 
                    animationType='slide'
                    transparent={true}
                    visible={visible} 
                    onRequestClose={() => setVisible(false)}>
                    <View style={styles.languageList}>
                        <FlatList data={Object.keys(languageResources)} renderItem={({item}) => (
                            <Pressable 
                                style={styles.languageButton}
                                onPress={() => changeLng(item)}
                            >
                                <Text style={styles.lngName}>
                                    {(languagesList as Languages)[item].nativeName}
                                </Text>
                            </Pressable>
                        )}/>
                    </View>
                </Modal>
                    <View style={styles.submitButton}>
                        {/* EDIT BUTTON */}
                        <Pressable  
                            onPress={handleUpdate}
                            style={({pressed}) => [
                                { backgroundColor: pressed ? Styles.colors.lightCharcoal : Styles.colors.bluePrimary},
                                styles.updateBtn,
                                ]}
                        >
                            <Text style={styles.updateBtnText}>
                                {loading ? t('Edited') : t('Edit')}
                                {' '}<Feather name="edit" size={20} color={Styles.colors.white} />
                            </Text>
                        </Pressable>
                        {/* LANGUAGE BUTTON */}
                        <Pressable  
                            onPress={() => setVisible(true)}
                            style={({pressed}) => [
                                { backgroundColor: pressed ? Styles.colors.lightCharcoal : Styles.colors.bluePrimary},
                                styles.updateBtn,
                                ]}
                        >
                            <Text style={styles.updateBtnText}>
                                {/* {loading ? t('Updated') : t('Update Profile')} */}
                                {t('Language')}
                                {' '}<Entypo name="language" size={24} color={Styles.colors.white} />
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.submitButton, {paddingLeft: 30}]}>
                        {/* LOGOUT BUTTON */}
                        <LogoutButton />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        backgroundColor: Styles.colors.white,
    },
    imageContainer: {
        alignItems: 'center',
        backgroundColor: Styles.colors.lightCoral,
        borderBottomWidth:1,
        borderColor: Styles.colors.lightBlue,
    },
    imageBoxContainer: {
        borderWidth:2,
        borderRadius: 12, 
        borderColor: Styles.colors.bluePrimary,
    },
    imageBox: {
        height: 120, 
        width: 120, 
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    editButtonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 70,
        left: 70,
    },
    userName: {
        paddingVertical: 12,
        fontSize: 24,
        fontWeight: '600',
    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        gap: 32,
        
        marginBottom: 10,
    },
    profileContainer: {
        paddingVertical :10,
        marginHorizontal: '15%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        gap: 16,
        borderBottomWidth: 1,
        borderColor: Styles.colors.lightBlue,
        
    },
    infoContainer: {
        flexDirection: "column",
        justifyContent: "center",
    },
    elementGap: {
        marginVertical: 6,
    },
    boxContainer: {
        marginBottom: 10,
    },
    
    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
    },
    inputText: {
        fontWeight: "bold",
        width: 70,
        color: "gray",
    },
    editableInputBox: {
        borderRadius: 10,
        backgroundColor: Styles.colors.lightCoral,
        height: 24,
        width: 160,
        paddingLeft: 12,
    },
    nonEditableInputBox: {
        paddingLeft: 12,
    },
    inputBox: {
        width: 250,
        height: 30,
        backgroundColor: Styles.colors.white,
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5,
    },
    updateBtn: {
        height: 50,
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateBtnText: {
        color: Styles.colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
    submitButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
    },

    ////
    languageList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '90%',
        marginHorizontal: 90,
        borderRadius: 20,
        height: 110,
        // backgroundColor: Styles.colors.lightBlue,
        backgroundColor: '#ade8f4',
        borderColor: '#0096c7',
        borderWidth: .5,
    },
    languageButton: {
        margin:4,
        padding: 12,
        // backgroundColor: Styles.colors.bluePrimary,
        backgroundColor: '#00b4d8',
        borderRadius: 10,
        borderColor: Styles.colors.lightCoral,
        borderWidth: 1,
    },
    lngName: {
        fontSize: 16,
        color: Styles.colors.lightCoral,
    },
});

export default Account