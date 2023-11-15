import { 
    Text, 
    Pressable, 
    StyleSheet,
    View,
} from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';

const FooterMenu = () => {
    const { t } = useTranslation()
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute();
    console.log(route)
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 
                    name='home' 
                    style={styles.iconStyle}
                    color={route.name === 'Home' ? 'orange': undefined}/>
                <Text>Home</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Post')}>
                <FontAwesome5 
                    name='plus-circle' 
                    style={styles.iconStyle} 
                    color={route.name === 'Post' ? 'orange': undefined}/>
                <Text>Post</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('About')}>
                <FontAwesome5 
                    name='info-circle' 
                    style={styles.iconStyle}
                    color={route.name === 'About' ? 'orange': undefined}/>
                <Text>About</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Account')}>
                <FontAwesome5 
                    name='user-edit' 
                    style={styles.iconStyle}
                    color={route.name === 'Account' ? 'orange': undefined}/>
                <Text>Account</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Language')}>
                <FontAwesome5 
                    name='language' 
                    style={styles.iconStyle}
                    color={route.name === 'Language' ? 'orange': undefined}/>
                <Text>Language</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,
    },
});
export default FooterMenu