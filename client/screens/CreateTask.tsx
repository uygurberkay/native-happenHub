import { View, Text, StyleSheet, ScrollView, Modal, FlatList, Pressable, Alert, TextInput } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { Feather, MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import dayjs from 'dayjs';

// @ts-ignore
import { Styles } from '../constants/Color';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from "@react-navigation/stack";

/* Components */
import CreateModal from '../components/Ui/CreateModal';
import IconButton from '../components/Ui/IconButton';
import OptionInput from '../components/Ui/OptionInput';
import ColorCheckBox from '../components/Ui/ColorCheckBox';
import Switcher from '../components/Ui/Switcher';
import TimeSelectModal from '../components/Ui/TimeSelectModal';
import axios from 'axios';

type RootStackParamList = {
    Agenda: any;

};

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Agenda'>;


const CreateTask = () => {
    const [state, setState]: any = useContext(AuthContext);
    const { user, token } = state;
    const userId = user._id;

    const { t } = useTranslation();
    const [loading, setLoading] : any = useState(false);
    const [visible, setVisible] = useState<boolean>(true)
    const [visibleTimeModal, setVisibleTimeModal] = useState<boolean>(false)
    const [visibleTimeModal2, setVisibleTimeModal2] = useState<boolean>(false)
    const navigation: any = useNavigation()

    /* Local States */
    const [activityName, setActivityName] = useState<string>('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [taskCategory, setTaskCategory] = useState<any>()
    const [colaboratives, setColaboratives] = useState<String[]>([])
    const [selectedColor, setSelectedColor] = useState(null);
    const [details, setDetails] = useState('') 
    const [isEnabled, setIsEnabled] = useState<boolean>();
    console.log(isEnabled)
    const [value, setValue] = useState(dayjs());

    /* DUMMY  */
    const taskCategories = ['Friends', 'Art', 'Events']
    const colaborativeData = [{key: '1',value:'Damla'}, {key: '2',value:'Melis'}, {key: '3',value:'Pelinsu'}, {key: '4',value:'Beyza'}]
    const colorData = [
        { id: 1, color: '#FF5733' },
        { id: 2, color: '#33FF57' },
        { id: 3, color: '#4bff33' },
        { id: 4, color: '#ffcc33' },
        { id: 5, color: '#ff3355' },
        { id: 6, color: '#4b33ff' },
        { id: 7, color: '#020f07' },
    ];


    /* Header Settings */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${t('Create Activity')}`,
            headerRight: () => (
                    <IconButton 
                        image={user.image}
                        color={Styles.colors.lightCharcoal}
                        onPress={() => {navigation.navigate('Profile')}}
                    />
                ),
        });
    }, []);

    const toggleModal = () => {
        // setVisible(!visible);
        navigation.navigate("Agenda")
    };

    /* Handles clear input */
    const clearInputs = () => {
        setActivityName('')
        setStartTime(undefined)
        setEndTime(undefined)
        setTaskCategory(null)
        setColaboratives([])
        setSelectedColor(null)
        setDetails('')
        setIsEnabled(false)
    }

    /* Handles Pro User Notification */
    const handlePro = () => {
        Alert.alert('Feature not available', 'Upgrade your subscription', [
            {text: 'OK', onPress: () => {}},
        ]);
    }

    const handleCreateEvent2 = async () => {
        console.log('EVENT CREATED')
        setVisible(!visible)
        // navigation.navigate('')
    }
    /* Create Event */
    const handleCreateEvent = async () => {
        try {
            setLoading(true)
            if (!activityName || !startTime || 
                !taskCategory || !details || 
                !selectedColor || !endTime){
                setLoading(false)
                Alert.alert('Please fill all fields')
                return;
            }
            const response = await axios.post(
                '/agenda/create-event',{
                    title: activityName,
                    startDate: startTime,
                    endDate: endTime,
                    categories: taskCategory,
                    colaboratives: [ userId,  ], // Bunu sonradan düzelt. Fetchlediğin datanın formatında yap
                    description: details,
                    color: selectedColor,
                    status:isEnabled,
                })
            clearInputs()
            console.log('Response --> ', response)
            if (response.status === 201) {
                setLoading(false)
                setVisible(!visible)
                navigation.navigate('Agenda')
            }
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    
    return (
        <>
            {/* Create Box Pop-up */}
            <CreateModal 
                visible={visible}
                toggleModal={toggleModal}
                handlePro={handlePro}
                handleCreateEvent={handleCreateEvent2}
            />
            {/* Modal for Start Time */}
            <TimeSelectModal 
                visible={visibleTimeModal} 
                setVisible={setVisibleTimeModal}
                value={startTime}
                setValue={setStartTime}
            />
            {/* Modal for End Time */}
            <TimeSelectModal 
                visible={visibleTimeModal2} 
                setVisible={setVisibleTimeModal2}
                value={endTime}
                setValue={setEndTime}
            />
            {/* Button to Toggle Modal */}
            <View style={styles.outerContainer}>
                <View style={styles.upperContainer}>
                    {/* Name */}
                    <TextInput
                        style={styles.upperTextInput}
                        value={activityName}
                        placeholder='Name'
                        onChangeText={(text) => setActivityName(text)}
                    />
                    {/* Time Adjustment */}
                    <View style={styles.upperBtnContainer}>
                        {/* Start */}
                        <Pressable
                            onPress={() => {setVisibleTimeModal(true)}}
                            style={({pressed}) => [
                                { backgroundColor: pressed ? Styles.colors.blueThird : Styles.colors.white},
                                styles.clickBtn,
                            ]}
                        >
                            <View style={styles.pressableView}>
                                <FontAwesome name="flag-o" size={24} color={Styles.colors.bluePrimary} />
                                <Text style={{}}>{t('Start Time')}</Text>
                            </View>
                        </Pressable>
                        {/* End */}
                        <Pressable
                            onPress={() => {setVisibleTimeModal2(true)}}
                            style={({pressed}) => [
                                { backgroundColor: pressed ? Styles.colors.blueThird : Styles.colors.white},
                                styles.clickBtn,
                            ]}
                        >
                            <View style={styles.pressableView}>
                                <Entypo name="flag" size={24} color={Styles.colors.bluePrimary} />
                                <Text style={{}}>{t('End Time')}</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <ScrollView
                        keyboardDismissMode={'on-drag'}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        {/* Task Category and Colaboratives */}
                        <OptionInput 
                            taskCategory={taskCategory} 
                            setTaskCategory={setTaskCategory}
                            colaboratives={colaboratives}
                            setColaboratives={setColaboratives}
                            taskCategories={taskCategories}
                            colaborativeData={colaborativeData}
                        />
                        {/* Details */}
                        <TextInput
                            style={styles.lowerTextInput}
                            value={details}
                            multiline
                            numberOfLines={4}  // Adjust the number of lines as needed
                            placeholder={t('Details')}
                            onChangeText={(text) => setDetails(text)}
                        />
                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                <View style={styles.colorCheckBox}>
                    <ColorCheckBox 
                        colorData={colorData} 
                        selectedColor={selectedColor} 
                        setSelectedColor={setSelectedColor}
                    />
                </View>
                <View>
                    <Switcher 
                        isEnabled={isEnabled}
                        setIsEnabled={setIsEnabled}
                    />
                </View>
                <Pressable  
                    onPress={handleCreateEvent}
                    style={({pressed}) => [
                        { backgroundColor: pressed ? Styles.colors.lightCharcoal : Styles.colors.bluePrimary},
                        styles.updateBtn,
                        ]}
                >
                    <Text style={styles.updateBtnText}>
                        {!loading ? t('Create Activity') : t('Activity Created')}
                    </Text>
                </Pressable>
            </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    upperContainer: {
        flex: .25,
        backgroundColor: Styles.colors.lightCoral,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: Styles.colors.darkGrey,
    },
    lowerContainer: {
        flex: .4,
        backgroundColor: Styles.colors.white,
        borderBottomWidth: 1,
        borderColor: Styles.colors.lightBlue,
    },
    bottomContainer: {
        flex: .3,
        backgroundColor: Styles.colors.white,
    },
    upperBtnContainer: {
        flexDirection: 'row',
        paddingTop: 24,
        gap: 32,
        alignSelf: 'center',
    },
    pressableView: {
        flexDirection: 'row', 
        gap: 8, 
        alignItems: 'center'
    },
    upperTextInput: {
        borderRadius: 10,
        backgroundColor: Styles.colors.white,
        height: '24%',
        width: '90%',
        alignSelf: 'center',
        paddingLeft: 12,
        // Shadow
        elevation: 8,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
    },
    lowerTextInput: {
        borderRadius: 10,
        backgroundColor: Styles.colors.white,
        borderWidth: 1,
        paddingLeft: 12,
        borderColor: Styles.colors.lightBlue ,
        height: '40%',
        width: '90%',
        alignSelf: 'center',
        // Shadow
        elevation: 8,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
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
    colorCheckBox: {
        borderBottomWidth: 1,
        borderBottomColor: Styles.colors.lightBlue,
    },
    updateBtn: {
        height: '25%',
        width: '60%',
        top: 4,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    updateBtnText: {
        color: Styles.colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
});

export default CreateTask