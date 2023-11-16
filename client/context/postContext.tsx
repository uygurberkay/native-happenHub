import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/* Context */
const PostContext = createContext()

/* Provider */
const PostProvider = ({children} : any) => {
    /* Global states */
    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState([]);
    
    // Get Posts
    const getAllPosts = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get('/post/get-all-post')
            setLoading(false)
            setPosts(data?.posts)
            console.log(data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // Initial Posts
    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <PostContext.Provider value={[posts, setPosts]}>
            {children}
        </PostContext.Provider>    
    )
}

export {PostContext, PostProvider}