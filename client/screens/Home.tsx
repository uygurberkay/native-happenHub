import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';

const Home = () => {
    /* Global state */
    // const [state]: any = useContext(AuthContext);
    const [posts]: any = useContext(PostContext);
    return (
        <View style={styles.container}>
            <ScrollView>
                <PostCard posts={posts}/>
            </ScrollView>
            <View style={{backgroundColor: '#ffffff'}}>
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
    },
});

export default Home