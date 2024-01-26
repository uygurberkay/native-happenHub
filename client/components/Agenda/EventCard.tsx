import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Styles } from '../../constants/Color.android';

interface Event {
    
}

interface EventCardProps {
    events?: any[];
}

const EventCard: React.FC<EventCardProps>  = ({events}) => {
    console.log('EVENTS --> ',events)

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Total Posts {events?.length}</Text>
            {events?.map((post,index) => (
                <View style={[styles.card, {backgroundColor: post.color.color}]} key={index}>
                    <View>
                        <Text style={[styles.title, {color: post.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey}]}>Title: {post?.title}</Text>
                        <Text style={[styles.desc, {color: post.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey}]}> {post?.description}</Text>
                    </View>
                    <View style={styles.footer}>
                        {post?.postedBy?.name && (
                            <Text style={{color: post.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey}}> 
                                <FontAwesome5 name='user-alt' color={post.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey}/>{'  '}
                                {post?.postedBy?.name}
                            </Text>
                        )}
                        <Text style={{color: post.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey}}> 
                            <FontAwesome5 name='clock' color={post.color.theme ? Styles.colors.darkCharcoal : Styles.colors.darkGrey}/>{'  '}
                            {moment( post?.createdAt).format('DD.MM.YYYY')}
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
    },
    heading: {
        color: 'green',
        textAlign: 'center',
    },
    card: {
        width: '100%',
        borderWidth: .4,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        paddingBottom: 10,
        borderBottomWidth: .3,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    hr: {
        borderBottomWidth: .3,
    },
    desc: {
        marginTop: 10,
    },
})

export default EventCard