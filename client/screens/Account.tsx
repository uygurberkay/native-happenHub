import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LogoutButton from '../components/Ui/LogoutButton';

const Account = () => {
    /* Global state */
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const { t } = useTranslation();
    
    /* Local state */
    const [name, setName] = useState<string>(user?.name);
    const [password, setPassword] = useState<string>(user?.password);
    const [email] = useState<string>(user?.email);
    const [loading, setLoading] = useState<boolean>(false);

    /* Handle update user data */
    const handleUpdate = async () => {
        try {
            setLoading(true)
            const {data} = await axios.patch(
                '/auth/update-user',
                {
                    name, password, email
            });
            setLoading(false)
            let UD = JSON.stringify(data);
            // console.log('UD --- >',UD)
            setState({ ...state, user: UD?.updatedUser });
            alert(data && data.message);
        } catch (error: any) {
            alert(error?.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            {/* DUMMY PHOTO */}
            <View style={{alignItems: 'center'}}>
                <Image source={{
                    uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                }}
                style={{height: 200, width: 200, borderRadius: 100}}
                />
            </View>
            <Text style={styles.warningtext}>Currently you can only update name and password</Text>
            <ScrollView>
            <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{t('Name')}</Text>
                <TextInput
                    style={styles.inputBox}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{t('Email')}</Text>
                <TextInput style={styles.inputBox} value={email} editable={false} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{t('Password')}</Text>
                <TextInput
                    style={styles.inputBox}
                    value={password}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{t('Role')}</Text>
                <TextInput
                    style={styles.inputBox}
                    value={state?.user.role}
                    editable={false}
                />
            </View>
            <View style={{alignItems: 'center'}}>
                <Pressable  
                    onPress={handleUpdate}
                    style={({pressed}) => [
                        { backgroundColor: pressed ? 'rgb(164, 169, 175)' : 'black'},
                        styles.updateBtn,
                        ]}
                >
                    {/* {({pressed}) => (
                        <Text style={styles.updateBtnText}>
                            {pressed ? t('Updated!') : t('Update Profile')}
                        </Text>
                    )} */}
                    <Text style={styles.updateBtnText}>
                        {loading ? t('Updated') : t('Update Profile')}
                    </Text>
                </Pressable>
                <LogoutButton />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
    },
    warningtext: {
        color: "red",
        fontSize: 13,
        textAlign: "center",
    },
    inputContainer: {
        marginTop: 20,
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
    inputBox: {
        width: 250,
        height: 30,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5,
    },
    updateBtn: {
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateBtnText: {
        color: '#ffffff',
        fontSize: 16,
    }
});

export default Account