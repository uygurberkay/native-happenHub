import { View, ScrollView, StyleSheet, ScrollViewBase } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import AgendaScreen from '../components/Agenda/AgendaScreen';
// @ts-ignore
import { Styles } from '../constants/Color';
import EventCard from '../components/Agenda/EventCard';
import Notifications from '../components/Agenda/Notifications';
import Tabs from '../components/Ui/Tabs';

const Agenda = () => {
    /* Authentication */
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const userId = user._id;

    /* Local state */
    const [events, setEvents] : any = useState([]);
    const [matchEvets, setMatchEvents] : any = useState([]);
    const [loading, setLoading] : any = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const tabs = ["Ongoing", "Notifications"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    useEffect(() => {
        /* Gets user agendas*/
        const getUserAgendas = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/agenda/get-events/${userId}`)
                setLoading(false)
                // console.log('RESPONSE DATA --> ',response.data)
                setEvents(response.data)
            } catch (error) {
                setLoading(false)
                alert(error)
            }
        }
        getUserAgendas()
    },[])

    useEffect(() => {
        /* Gets user agendas match by Date */
        const getUserAgendasByDate = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/agenda/get-events/${userId}/${formattedDate}`)
                setLoading(false)
                setMatchEvents(response.data)
            } catch (error) {
                setLoading(false)
                alert(error)
            }
        }
        getUserAgendasByDate();
    }, [formattedDate]);

    const displayTabContent = () => {
        switch (activeTab) {
            case "Ongoing":
                return (
                    <ScrollView>
                        <EventCard events={matchEvets} />
                    </ScrollView>
                );
            case "Notifications":
                return (
                    <View>
                        <Notifications/>
                    </View>
                );
        
            default:
                return null;
            }
    }

    return (
        <>
        <View style={styles.container}>
            <View>
                <View style={{backgroundColor: Styles.colors.lightCoral}}>
                    <AgendaScreen
                        formattedDate={formattedDate}
                        setFormattedDate={setFormattedDate}
                        />
                    <View style={styles.tabContainer}>
                        <Tabs 
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </View>
                </View>
                <View>
                    {displayTabContent()}
                </View>
            </View>
        </View>
        </>
        
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue,
    },
    tabContainer: {
        zIndex: 1,
        marginTop: -80 // To take up menu
    },
});

export default Agenda