import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterMenu from '../components/Menus/FooterMenu'
import PostCard from '../components/PostCard'
import axios from 'axios';

const MyPosts = () => {
    /* Local state */
    const [posts, setPosts] : any = useState([]);
    const [loading, setLoading] : any = useState(false);

    /* Get user post */
    const getUserPosts = async () => {
        try {
            setLoading(true)
            const {data} = await axios.get('/post/get-user-post')
            setLoading(false)
            setPosts(data?.userPosts)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert(error)
        }
    }
    useEffect(() => {
        getUserPosts()
    },[])

    return (
        <View style={styles.container}>
            <ScrollView>
                <PostCard posts={posts} />
            </ScrollView>
            <View style={{ backgroundColor: "#ffffff" }}>
            <FooterMenu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
    },
});

export default MyPosts