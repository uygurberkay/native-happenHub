import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { Styles } from '../../constants/Color.android';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Event {
    title: string;
    colaboratives: string[]; // Assuming colaboratives is an array of strings
    createdAt: string;
    color: {
        color: string;
        theme: boolean;
    };
    startDate: Date;
    endDate: Date;
    status: boolean;
}

interface Collaborator {
    name?: string;
    image?: string;
    map?: any;
    length?: any;
}

interface EventCardProps {
    events?: Event[];
}

type RootStackParamList = {
    AgendaChat: { eventId : string };

};

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgendaChat'>;


const EventCard: React.FC<EventCardProps>  = ({events}) => {
    const navigation = useNavigation<ChatScreenNavigationProp>();
    const [collaboratorsDetails, setCollaboratorsDetails] = useState<Collaborator[]>([]);

    useEffect(() => {
      // Fetch details for each collaborator when the component mounts
        const fetchCollaboratorsDetails = async () => {
            if (events) {
            const detailsPromises = events.map(async (event) => {
                const collaboratorDetails = await getCollaboratorDetails(event.colaboratives);
                return collaboratorDetails;
            });
    
            const allCollaboratorsDetails : any= await Promise.all(detailsPromises);
            setCollaboratorsDetails(allCollaboratorsDetails);
            }
        };
    
        fetchCollaboratorsDetails();
        }, [events]);
    
        const getCollaboratorDetails = async (colaboratives: string[]) => {
        const detailsPromises = colaboratives.map(async (collaboratorId) => {
            try {
            const response = await axios.get(`/auth/user/${collaboratorId}`);
            return response.data;
            } catch (error) {
            console.error(`Error fetching details for user with ID ${collaboratorId}:`, error);
            return null;
            }
        });
    
        const collaboratorsDetails = await Promise.all(detailsPromises);
        return collaboratorsDetails.filter((detail) => detail !== null) as Collaborator[];
    };

    console.log('EVENTS --> ',events)

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Total Event {events?.length}</Text>
            {events?.map((event, index) => (
                <View style={[styles.card, { backgroundColor: event.color.color }]} key={index}>
                <View>
                    <View style={styles.menuContainer}>
                        <Text style={[styles.title, { color: event.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey }]}>
                        {event?.title}
                        </Text>
                        <View>
                            {event?.status ? (
                                <View style={styles.circle}>
                                    <View style={[styles.outerCircle, { borderColor: Styles.colors.redLight}]}>
                                        <View style={[styles.innerCircle, {backgroundColor: Styles.colors.redLight,}]}></View>
                                    </View>
                                    <Text style={{color: Styles.colors.redLight}}>Private</Text>
                                </View>
                            ) : (
                                <View style={styles.circle}>
                                    <View style={[styles.outerCircle, { borderColor: Styles.colors.greenLight}]}>
                                        <View style={[styles.innerCircle, {backgroundColor: Styles.colors.greenLight,}]}></View>
                                    </View>
                                    <Text style={{color: Styles.colors.greenLight}}>Public</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <View style={styles.collaborativesContainer}>
                            {collaboratorsDetails[index]?.map((collaborator: Collaborator, collaboratorIndex: any) => (
                                <View key={collaboratorIndex} style={styles.collaborativeContainer}>
                                <Text style={[styles.collaborativeText, { color: event.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey }]}>
                                {collaborator.name!.split(' ')[0]}
                                {collaboratorIndex !== collaboratorsDetails[index].length - 1 ? ' & ' : ''}
                                </Text>
                            </View>
                            ))}
                        </View>
                        <Pressable
                            onPress={() => 
                                navigation.navigate('AgendaChat', { eventId : event._id,})
                            }
                            style={({pressed}) => [
                                { backgroundColor: pressed ? 'rgba(89, 86, 86, 0.965)' : 'rgba(255, 255, 255, 0.156)'},
                                styles.clickBtn,
                            ]}
                        >
                            <Feather name="message-square" size={24} color={event.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <View style={{width: 12}}>
                        <View style={{flexDirection: 'row',}}>
                            {collaboratorsDetails[index]?.map((collaborator: Collaborator, collaboratorIndex: any) => (
                                <View key={collaboratorIndex} style={styles.collaborativeContainer}>
                                    <Image source={{ uri: collaborator.image }} style={styles.collaboratorImage} />
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={{ alignSelf: 'center' ,color: event.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey }}>
                        {moment(event?.endDate).format('hh:mm A')}{' - '}
                        {moment(event?.endDate).format('hh:mm A')}
                    </Text>
                </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Styles.colors.white,
        marginBottom: 400,
    },
    heading: {
        color: Styles.colors.errorRed,
        textAlign: 'center',
    },
    card: {
        width: '80%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10, 
        /* Shadow */
        elevation: 6,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .6,
        shadowRadius: 12,
        shadowOffset: { width: 1, height: 1} ,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 4
    },
    innerCircle: {
        borderRadius: 20, 
        height: 12, 
        width: 12,
    },
    outerCircle: {
        padding: 4, 
        borderRadius: 20, 
        borderWidth: 2, 
    },
    clickBtn: {
        padding: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.156)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hr: {
        borderBottomWidth: .3,
    },
    desc: {
        marginTop: 10,
    },
    collaborativeText: {
        marginTop: 5,
    },
    collaborativesContainer: {
        flexDirection: 'row',
        width: '30%',
    },
    collaborativeContainer: {
        flexDirection: 'row',
    },
    collaboratorImage: {
        borderWidth: 1,
        borderColor: Styles.colors.white,
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        marginRight: -8, 
    },
})

export default EventCard