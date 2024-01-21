import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/* Context */
// @ts-ignore
const AgendaContext = createContext()

/* Provider */
const AgendaProvider = ({children} : any) => {
    /* Global states */
    const [loading, setLoading] = useState<boolean>(false);
    const [agendas, setAgendas] = useState([]);

    // Initial Events
    useEffect(() => {
        // Get Posts
        const getAllEvents = async () => {
            setLoading(true)
            try {
                const {data} = await axios.get('/agendas/get-events')
                setLoading(false)
                setAgendas(data?.agendas)
            } catch (error) {
                setLoading(false)
            }
        }
        getAllEvents()
    }, [])

    return (
        <AgendaContext.Provider value={[agendas, setAgendas]}>
            {children}
        </AgendaContext.Provider>    
    )
}

export {AgendaContext, AgendaProvider}