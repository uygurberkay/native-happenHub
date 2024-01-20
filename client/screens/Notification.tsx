import { 
    View, 
    StyleSheet, 
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import TimeSelectModal from '../components/Ui/TimeSelectModal';

const Notification = () => {
    /* Authenticaton */
    const [state]: any = useContext(AuthContext);

    return (
        // <View style={styles.container}>
        //     <TimeSelectModal />
        // </View>
        <>
                    <TimeSelectModal />
        </>
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