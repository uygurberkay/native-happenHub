import { View, Text, Modal, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from 'react-native-ui-datepicker';

// @ts-ignore
import { Styles } from '../../constants/Color';
import { useTranslation } from 'react-i18next';

interface CreateModalProps{
    visible: any;
    setVisible: any;
    value: any;
    setValue: any;
}

const TimeSelectModal = ({visible, setVisible, value, setValue}: CreateModalProps) => {
    const { t } = useTranslation()
    const {height} = useWindowDimensions()

    const handleUpdate = () => {
        setVisible(false)
        console.log('Date --> ', value)
    }
    const toggleModal = () => {
        setVisible(!visible)
    }
    
    let boxheight
    if(height > 700) {
        boxheight ='52%';
    }else {
        boxheight='65%'
    }


    return (
        <>
            {/* Transparent Background Modal */}
            <Modal
                transparent
                visible={visible}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <Pressable
                    style={styles.modalContainer}
                    onPress={toggleModal}
                >
                    {/* @ts-ignore */}
                <View style={[styles.modalContent, {height: boxheight,}]}>

                    {/* Time Selector */}
                    <View style={styles.buttonContainer}>
                        <DateTimePicker
                            value={value}
                            onValueChange={(date: any) => setValue(date)}
                            locale={'tr'}
                            firstDayOfWeek={1}
                            selectedItemColor={Styles.colors.bluePrimary}
                            headerButtonSize={12}
                            dayContainerStyle={{ }}
                        />
                    </View>

                    {/* Confirm Button */}
                        <Pressable  
                            onPress={handleUpdate}
                            style={({pressed}) => [
                                { backgroundColor: pressed ? Styles.colors.lightCharcoal : Styles.colors.bluePrimary},
                                styles.updateBtn,
                                ]}
                        >
                            <Text style={styles.updateBtnText}>
                                {t('Confirm')}
                            </Text>
                        </Pressable>
                </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Styles.colors.white,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
        left: '1%',
        width: '98%',
        backgroundColor: Styles.colors.sunray,
        borderRadius: 20,
        gap: 12,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue ,
        /* Hover Color */
        elevation: 4,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
    },
    buttonContainer: {
        fontSize: 12,
        width: '90%',
        height: '72%',
        backgroundColor: Styles.colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue,
    },
    pressableContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 12,
    },
    iconContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4
    },
    textIcon: {
        color: Styles.colors.bluePrimary,
        paddingTop: 6,
        alignSelf: 'center',
        fontSize: 10,
        fontWeight: '800',
    },
    createText: {
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: '400',
    },
    clickBtn: {
        height: 70,
        width: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue ,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateBtn: {
        height: '15%',
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue ,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateBtnText: {
        color: Styles.colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        marginRight: 10,
    },
    picker: {
        height: 50,
        width: 100,
    },
    selectedValues: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TimeSelectModal