import { 
    StyleSheet,
    ScrollView,
} from 'react-native'
import React from 'react'
// @ts-ignore
import { Styles } from '../constants/Color';
import NotificationComponent from '../components/Ui/NotificationComponent';
import { NotificationProvider } from '../context/notificationContext';


const Notification = () => {

    return (
        <NotificationProvider>
            <ScrollView style={styles.container}>
                {/* <NotificationScreen /> */}
                <NotificationComponent 
                    bigTitle={'Stop all'}
                    smallTitle={'Silence notifications for a time'}
                />
                <NotificationComponent 
                    bigTitle={'Quite mode'}
                    smallTitle={'Silence notifications on nights'}
                />
                <NotificationComponent 
                    bigTitle={'Group notifications'}
                    smallTitle={'Silence group notifications'}
                />
                <NotificationComponent 
                    bigTitle={'Messages'}
                    smallTitle={'Silence all messages'}
                />
                <NotificationComponent 
                    bigTitle={'Birthday notifications'}
                    smallTitle={'Silence birthday notifications'}
                />
                <NotificationComponent 
                    bigTitle={'From happenHub'}
                    smallTitle={'Silence notifications from happenHub'}
                />
            </ScrollView>
        </NotificationProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.colors.white,
        marginBottom: 50,
    },
});

export default Notification