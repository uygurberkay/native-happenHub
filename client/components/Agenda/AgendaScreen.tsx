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
                style={{height: 240, paddingTop: 20, paddingBottom: 10, }} // Style Background Box
                calendarColor={Styles.colors.lightCoral}
                onDateSelected={onDateSelected}
                daySelectionAnimation={{ //  Style Unselected Box 
                    type: 'border', 
                    duration: 200, 
                    borderWidth: 2 ,
                    borderHighlightColor: Styles.colors.blueSecond,
                }}
                dayContainerStyle={{
                    backgroundColor: Styles.colors.white, 
                    borderColor: Styles.colors.lightBlue ,
                    borderRadius: 8,
                    
                }}
                highlightDateContainerStyle={{backgroundColor: Styles.colors.bluePrimary}} // Style Selected Box
                upperCaseDays={false}
                dateNameStyle={{color: Styles.colors.grey, fontSize: 8}}
                dateNumberStyle={{color: Styles.colors.grey, fontSize: 12}}
                highlightDateNameStyle={{color: Styles.colors.lightCharcoal, fontSize: 14}}
                highlightDateNumberStyle={{color: Styles.colors.lightCharcoal, fontSize: 16}}
            />
        </View>
        </>
    )
}

export default AgendaScreen