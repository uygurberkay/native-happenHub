import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-ignore
import { Styles } from '../../constants/Color';
import { useTranslation } from 'react-i18next';

interface CreateModalProps{
    visible: boolean;
    toggleModal: any;
    handlePro: any;
    handleCreateEvent: any;
}

const CreateModal = ({visible, toggleModal, handlePro, handleCreateEvent}: CreateModalProps) => {
    const { t } = useTranslation()
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
                <View style={styles.modalContent}>
                    {/* Your pop-up box content goes here */}
                    <View style={styles.buttonContainer}>
                            <Pressable
                                onPress={handlePro}
                                style={({pressed}) => [
                                    { backgroundColor: pressed ? Styles.colors.blueThird : Styles.colors.white},
                                    styles.clickBtn,
                                ]}
                            >
                                <View style={styles.pressableContainer}>
                                    <View >
                                        <View style={styles.iconContainer}>
                                            <Feather name="file-text" size={20} color={Styles.colors.redLight} />
                                            <Text>{t('Notepad')}</Text>
                                        </View>
                                        <Text style={styles.textIcon}>PRO</Text>
                                    </View>
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={handlePro}
                                style={({pressed}) => [
                                    { backgroundColor: pressed ? Styles.colors.blueThird : Styles.colors.white},
                                    styles.clickBtn,
                                ]}
                            >
                                <View style={styles.pressableContainer}>
                                    <View >
                                        <View style={styles.iconContainer}>
                                            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={Styles.colors.errorRed} />
                                            <Text >{t('Reminder')}</Text>
                                        </View>
                                    <Text style={styles.textIcon}>PRO</Text>
                                    </View>
                                </View>
                            </Pressable>
                    </View>
                        <Pressable
                            onPress={handleCreateEvent}
                            style={({pressed}) => [
                                { backgroundColor: pressed ? Styles.colors.blueThird : Styles.colors.white},
                                styles.updateBtn,
                            ]}
                        >
                            <View style={styles.pressableContainer}>
                                <MaterialCommunityIcons name="alarm-plus" size={32} color={Styles.colors.bluePrimary} />
                                <Text style={styles.createText}>{t('Create Task')}</Text>
                            </View>
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
        backgroundColor: '#ecf0f1',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 60,
        left: '5%',
        width: '90%',
        backgroundColor: Styles.colors.sunray,
        height: 200,
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
        flex: .6,
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
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
        height: 70,
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Styles.colors.lightBlue ,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CreateModal