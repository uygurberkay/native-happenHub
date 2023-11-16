import { View, Text, TextInput, ScrollView, Pressable, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PostContext } from '../context/postContext';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const Post = ({navigation}:any) => {
    /* Global state */
    const { t } = useTranslation();
    const [posts, setPosts]: any = useContext(PostContext);

    /* Local state */
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)

    /* Handle form data post  */
    const handlePost = async () =>{
        try {
            setLoading(true);
            if (!title || !description) alert("Please fill all areas ");
            const { data } = await axios.post(
                '/post/create-post',
                { title, description}
            );
            setLoading(false);
            setPosts([...posts, data?.posts])
            alert(data?.message)
            navigation.navigate('Home')
        } catch (error: any) {
            alert(error?.response.data.message || error.message);
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.heading}>
                        {t('Create a post')}
                    </Text>
                    <TextInput 
                        style={styles.inputBox} 
                        placeholder={t('Add post title')}
                        placeholderTextColor={'gray'}
                        value={title}
                        onChangeText={(text)=> setTitle(text)}
                    />
                    <TextInput 
                        style={{
                            ...styles.inputBox,
                            height: Platform.select({
                                ios: 150,
                                android: undefined,
                            })
                        }} 
                        placeholder={t('Add post descrition')}
                        placeholderTextColor={'gray'}
                        multiline={true}
                        numberOfLines={6}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                <View style={{alignItems : 'center'}}>
                    <Pressable
                        onPress={handlePost}
                        style={({pressed}) => [
                            { backgroundColor: pressed ? 'rgb(164, 169, 175)' : 'black'},
                            styles.postBtn,
                        ]}
                    >
                        <Text style={styles.postBtnText}>
                            <FontAwesome5 
                                name='plus-circle'
                                size={18}
                            />{'    '}
                            {t('Create Post')}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <FooterMenu/>
            </View>
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
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    inputBox: {
        backgroundColor: '#ffffff',
        textAlignVertical: 'top',
        paddingTop: 10,
        width: '90%',
        marginTop: 30,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 12,
    },
    postBtn: {
        width:'85%',
        marginTop: 30,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBtnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
    }
});

export default Post