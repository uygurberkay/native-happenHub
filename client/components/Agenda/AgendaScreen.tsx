import CalendarStrip   from 'react-native-calendar-strip';
import dayjs from 'dayjs';
import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
// @ts-ignore
import { Styles } from '../../constants/Color';
import moment from 'moment';

interface AgendaScreenProps{
    formattedDate: any;
    setFormattedDate: any;
}

const AgendaScreen = ({formattedDate, setFormattedDate}: AgendaScreenProps) => {

    /* Handles Selected Date */
    const onDateSelected = (selectedDate: any) => {
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
    };


    return (
        <>
        <View>
            <CalendarStrip
                scrollable
                style={{height: 240, paddingTop: 20, paddingBottom: 10, }}
                /* Style Background Box */
                calendarColor={Styles.colors.lightCoral}
                onDateSelected={onDateSelected}
                // calendarHeaderStyle={{color: Styles.colors.lightCharcoal}}
                // dateNumberStyle={{color: Styles.colors.lightCharcoal}}
                // dateNameStyle={{color: Styles.colors.lightCharcoal}}
                // iconContainer={{flex:.2}}
                /* Style Unselected Box */
                daySelectionAnimation={{
                    type: 'border', 
                    duration: 200, 
                    borderWidth: 2 ,
                    borderHighlightColor: Styles.colors.blueSecond,
                }}
                // innerStyle={{backgroundColor: Styles.colors.blueThird, marginTop: 20}}
                // calendarHeaderContainerStyle={{backgroundColor: Styles.colors.bluePrimary}}
                dayContainerStyle={{
                    backgroundColor: Styles.colors.white, 
                    borderColor: Styles.colors.lightBlue ,
                    borderRadius: 8,
                    
                }}
                // weekendDateNameStyle={{color: 'red'}}
                // weekendDateNumberStyle={{color: 'red'}}
                // highlightDateNameStyle={{borderColor: 'red'}}
                // highlightDateNumberContainerStyle={{backgroundColor: 'red'}}
                /* Style Selected Box */
                highlightDateContainerStyle={{backgroundColor: Styles.colors.bluePrimary}}
                // disabledDateNameStyle={{backgroundColor: 'red'}}
                // markedDatesStyle={{backgroundColor: 'red'}}
                // headerText={''}
                upperCaseDays={false}
                dateNameStyle={{color: Styles.colors.grey, fontSize: 8}}
                dateNumberStyle={{color: Styles.colors.grey, fontSize: 12}}
                highlightDateNameStyle={{color: Styles.colors.lightCharcoal, fontSize: 14}}
                highlightDateNumberStyle={{color: Styles.colors.lightCharcoal, fontSize: 16}}
            />
            <Text>{formattedDate}</Text>
        </View>
        
        </>
    )
}

export default AgendaScreen