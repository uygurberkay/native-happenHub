import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {View,Text, StyleSheet} from 'react-native';
import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
import { AntDesign } from '@expo/vector-icons';
// @ts-ignore
import { Styles } from '../../constants/Color';

interface OptionInputProps {
    taskCategory: any;
    setTaskCategory: any;
    colaboratives: any;
    setColaboratives: any;
    taskCategories: any;
    colaborativeData: any;
}

const OptionInput = ({taskCategory, setTaskCategory, colaboratives, setColaboratives, taskCategories, colaborativeData}: OptionInputProps) => {

    const { t } = useTranslation()
    const [selected, setSelected] = useState("");
    
    const data = [ 
        {key:'Canada', value:'Canada'},
        {key:'England', value:'England'},
        {key:'Pakistan', value:'Pakistan'},
        {key:'India', value:'India'},
        {key:'NewZealand', value:'NewZealand'},
    ]
    


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
            <MultipleSelectList 
                // @ts-ignore
                placeholder={
                    <>
                        <AntDesign name="addusergroup" size={24} color={Styles.colors.bluePrimary} />
                        <Text>{'   '}{t('Colaborate with')}</Text>
                    </>
                }
                data={colaborativeData} 
                save="value"
                label={t('Colaboratives')}
                boxStyles={styles.optionInput}
                setSelected={(val: any) => setColaboratives(val)} 
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