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
import Message from '../../screens/Message';
import Account from '../../screens/Account';
import { Image, Text, } from 'react-native';
import IconButton from '../Ui/IconButton';
// @ts-ignore
import { Styles } from '../../constants/Color';
import CreateTask from '../../screens/CreateTask';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {
    const BottomTab = createBottomTabNavigator();
    const { t } = useTranslation()
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
                    tabBarLabel: `${t('Agenda')}`,
                    headerTitle: `${t('Agenda')}`, // Will be change later, I think
                    tabBarIcon: ({color}) => <AntDesign name="calendar" size={20} color={color} />
                }}
            />
            <BottomTab.Screen 
                name="Message" 
                component={Message} 
                options={{
                    tabBarLabel: `${t('Message')}`,
                    headerTitle: `${t('Message')}`,
                    tabBarIcon: ({color}) => <Feather name="message-square" size={20} color={color} />
                }}
            />
            <BottomTab.Screen 
                name="Create" 
                component={CreateTask} 
                options={{
                    tabBarLabelStyle: {display: 'none', },
                    headerTitle: `${t('Create')}`,
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
                    headerTitle: `${t('Notification')}`,
                    tabBarLabel: `${t('Notification')}`,
                    tabBarIcon: ({color}) => <Ionicons name="notifications-outline" size={20} color={color} />
                }}
            />
            <BottomTab.Screen 
                name="Profile" 
                component={Account} 
                options={{
                    tabBarLabel: `${t('My Profile')}`,
                    headerTitle: `${t('My Profile')}`,
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