import React, { useContext } from 'react'

/* Icons */
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

/* React Navigation */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../context/authContext';

/* Screens and Components */
import Home from '../../screens/Home';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import LanguageSelector from '../LanguageSelector';
import Post from '../../screens/Post';
import Account from '../../screens/Account';
import { Image, Text, } from 'react-native';
import IconButton from '../IconButton';
// @ts-ignore
import { Styles } from '../../constants/Color';
import CreateTask from '../../screens/CreateTask';
import { View } from 'react-native';

const BottomNavigation = () => {
    const BottomTab = createBottomTabNavigator();
    return (
        <BottomTab.Navigator
            screenOptions={({navigation}) => ({
                headerTintColor: Styles.colors.lightCharcoal,
                tabBarActiveTintColor: Styles.colors.darkCharcoal,
                tabBarInactiveTintColor: Styles.colors.lightCharcoal,
                tabBarActiveBackgroundColor: Styles.colors.sunray,
                tabBarInactiveBackgroundColor: Styles.colors.white,
                tabBarLabelPosition: 'below-icon',
                tabBarStyle: {flex: .1, position: 'absolute', height: 60,},
                tabBarLabelStyle: {fontSize: 10, paddingBottom: 8},
                headerRight: ({tintColor}) => (
                    <IconButton 
                        image={undefined}
                        color={tintColor}
                        onPress={() => {navigation.navigate('Profile')}}
                    />
                ),
            })}
        >
            <BottomTab.Screen 
                name="Agenda" 
                component={Home} 
                options={{
                    headerTitle: 'Agenda', // Will be change later, I think
                    tabBarIcon: ({color}) => <AntDesign name="calendar" size={20} color={color} />
                }}
            />
            <BottomTab.Screen 
                name="Message" 
                component={Post} 
                options={{
                    headerTitle: 'Message',
                    tabBarIcon: ({color}) => <Feather name="message-square" size={20} color={color} />
                }}
            />
            <BottomTab.Screen 
                name="Create" 
                component={CreateTask} 
                options={{
                    tabBarLabelStyle: {display: 'none', } ,
                    tabBarIconStyle: {backgroundColor: 'purple'},
                    tabBarIcon: ({color}) => (
                        <View style={{ 
                            borderRadius: 8, 
                            borderWidth:1, 
                            borderColor: Styles.colors.lightCoral,
                            padding: 10,
                            backgroundColor: 'white', 
                            elevation: 8,
                            shadowColor: Styles.colors.lightCharcoal,
                            shadowOpacity: .4,
                            shadowRadius: 6,
                            shadowOffset: { width: 1, height: 1} ,
                        }}>
                            <Image source={require('../../assets/icons/Icon1.png')}/>
                        </View>
                    )
                }}
            />
            <BottomTab.Screen 
                name="Notification" 
                component={LanguageSelector} 
                options={{
                    headerTitle: 'Notification',
                    tabBarIcon: ({color}) => <Ionicons name="notifications-outline" size={20} color={color} />
                }}
            />
            <BottomTab.Screen 
                name="Profile" 
                component={Account} 
                options={{
                    headerTitle: 'My Profile',
                    tabBarIcon: ({color}) => <AntDesign name="user" size={20} color={color} />
                }}
            />
        </BottomTab.Navigator>
    )
}

const ScreenMenu = () => {
    /* Global state */
    const [state]: any = useContext(AuthContext);
    
    /* Auth condition */
    const authenticatedUser = state?.user && state?.token

    const Stack = createNativeStackNavigator()
    return (
        <>
            <Stack.Navigator initialRouteName={'Login'}>
                {authenticatedUser ? (
                <>
                    <Stack.Screen 
                    name='Home' 
                    component={BottomNavigation}
                    options={{
                        headerShown: false,
                    }}/>
                    {/* <Stack.Screen 
                        name="Home" 
                        component={Home} 
                        options={{
                            title: 'HappenHub',
                            headerRight: () => <LogoutButton/>
                        }}/>
                    <Stack.Screen 
                        name="Post" 
                        component={Post} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <LogoutButton/>
                        }}/>
                    <Stack.Screen 
                        name="About" 
                        component={About} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <LogoutButton/>
                        }}/>
                    <Stack.Screen 
                        name="MyPosts" 
                        component={MyPosts} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <LogoutButton/>
                        }}/>
                    <Stack.Screen 
                        name="Account" 
                        component={Account} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <LogoutButton/>
                        }}/>
                    <Stack.Screen 
                        name="Language" 
                        component={LanguageSelector} 
                        options={{
                            headerBackTitle: 'Back',
                            headerRight: () => <LogoutButton/>
                        }}/> */}
                </>
                ): (
                <>
                    <Stack.Screen 
                        name="Login" 
                        component={Login} 
                        options={{headerShown: false}}/>
                    <Stack.Screen 
                        name="Register" 
                        component={Register} 
                        options={{headerShown: false}}/>
                </>
                )}
            </Stack.Navigator>
        </>
    );
}
export default ScreenMenu