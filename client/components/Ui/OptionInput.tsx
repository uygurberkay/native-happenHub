import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {View,Text, StyleSheet} from 'react-native';
import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
import Dropdown from 'react-native-input-select';
import { AntDesign } from '@expo/vector-icons';
// @ts-ignore
import { Styles } from '../../constants/Color';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

interface OptionInputProps {
    taskCategory: any;
    setTaskCategory: any;
    colaboratives: any;
    setColaboratives: any;
    taskCategories: any;
}

const OptionInput = ({taskCategory, setTaskCategory, colaboratives, setColaboratives, taskCategories}: OptionInputProps) => {
    const [state]: any = useContext(AuthContext);
    const { user } = state;
    const userId = user._id;
    
    const { t } = useTranslation()
    const [colaborativeData, setColaborativeData] = useState([]);
    // const [selected, setSelected] = useState("");
    
    const acceptedFriendsList = useCallback(async () => {
        try {
            const response = await axios.get(`/auth/accepted-friends/${userId}`);
            
            if (response.status === 200) {
                const data = response.data;

                // Transforming data into the desired format
                const transformedData = data.map((friend: any, index: any) => ({
                    key: index.toString(),
                    label: friend.name,
                    value: friend._id,
                }));

                setColaborativeData(transformedData);
            }
        } catch (error) {
            console.log("Error showing the accepted friends", error);
        }
    }, [userId]);

    useEffect(() => {
        acceptedFriendsList();
    }, [acceptedFriendsList]);

    console.log(colaborativeData)

    return(
        <View style={{marginTop: 10,gap: 10}}>
            {/* Task Category */}
            <SelectList 
                setSelected={setTaskCategory} 
                data={taskCategories}  
                placeholder={t('Task Category')}
                boxStyles={styles.optionInput}
            />

            {/* Colaborates */}
            {/* <MultipleSelectList 
                // @ts-ignore
                placeholder={
                    <>
                        <AntDesign name="addusergroup" size={24} color={Styles.colors.bluePrimary} />
                        <Text>{'   '}{t('Colaborate with')}</Text>
                    </>
                }
                data={colaborativeData} 
                save="key"
                label={t('Colaboratives')}
                boxStyles={styles.optionInput}
                // setSelected={(val: any) => setColaboratives(val)} 
                setSelected={(val: any) => setColaboratives(val)}  // Set only _id in setColaboratives
            /> */}

            <Dropdown
                placeholder={t('Colaborate with')}
                options={colaborativeData}
                selectedValue={colaboratives}
                onValueChange={(value: any) => setColaboratives(value)}
                primaryColor={Styles.colors.bluePrimary}
                isSearchable={true}
                isMultiple={true}
                // dropdownIcon={<AntDesign name="addusergroup" size={24} color={Styles.colors.bluePrimary} />}
                placeholderStyle={{color: Styles.colors.darkCharcoal}}
                dropdownStyle={styles.optionInput}
                modalOptionsContainerStyle={{width: '80%',left: '10%' ,bottom: '10%', borderRadius: 20}}
                // modalProps={{supportedOrientations:}
                // listHeaderComponent={<Text>blabla</Text>}
                // listFooterComponent={<Text>Flafla</Text>}
                checkboxComponentStyles={{
                    checkboxSize: 8, 
                    checkboxLabelStyle: {color: Styles.colors.darkCharcoal}, 
                    checkboxStyle: {backgroundColor: 'red', borderColor: Styles.colors.blueSecondary}
                }}
                listControls={{selectAllText: 'checkbox', emptyListMessage: t('User not found')}}
                searchControls={{
                    textInputStyle: {color: Styles.colors.darkCharcoal},
                    textInputContainerStyle: {},
                    textInputProps: {cursorColor: Styles.colors.bluePrimary, placeholder: t('Colaborate with')}
                }}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    optionInput: {
        borderRadius: 10,
        backgroundColor: Styles.colors.white,
        borderColor: Styles.colors.lightBlue ,
        width: '90%',
        alignSelf: 'center',
        // Shadow
        elevation: 8,
        shadowColor: Styles.colors.lightCharcoal,
        shadowOpacity: .4,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1} ,
    },
})

export default OptionInput;