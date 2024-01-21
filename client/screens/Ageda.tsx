import { View, ScrollView, StyleSheet, ScrollViewBase } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import AgendaScreen from '../components/Agenda/AgendaScreen';
// @ts-ignore
import { Styles } from '../constants/Color';
import EventCard from '../components/Agenda/EventCard';

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

    return (
        <View style={styles.container}>
            <AgendaScreen
                formattedDate={formattedDate}
                setFormattedDate={setFormattedDate}
            />
            <ScrollView>
                <EventCard events={matchEvets} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue,
    },
});

export default Agenda