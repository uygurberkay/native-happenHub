import { 
    View, 
    StyleSheet,
    Text, 
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import TimeSelectModal from '../components/Ui/TimeSelectModal';
import NotificationScreen from '../components/Messages/Notification/NotificationScreen';

const Notification = () => {
    /* Authenticaton */
    const [state]: any = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NotificationScreen />
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

export default Notification