import React, { useState } from 'react';
import {  ScrollView, StyleSheet,  Text, Pressable, View } from 'react-native';
// @ts-ignore
import { Styles } from '../../constants/Color';

interface ColorCheckboxMapProps {
    selectedColor: any;
    setSelectedColor: any;
}

const ColorCheckboxMap = ({selectedColor, setSelectedColor}: ColorCheckboxMapProps) => {
    const colorData = Styles.colorData;

    const toggleColor = (color: string, theme: boolean) => {
        // // Check if the color is already selected, then remove it; otherwise, set it as the selected color
        // setSelectedColor((prevSelectedColor: any) => (prevSelectedColor === color ? null : color));
        setSelectedColor((prevSelectedColor: any) => {
            const isSelected = prevSelectedColor && prevSelectedColor.color === color && prevSelectedColor.theme === theme;
            return isSelected ? null : { color, theme };
        });
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.checkboxContainer}
            >
            {colorData.map((item: any) => (
                <Pressable
                    key={item.id}
                    onPress={() => toggleColor(item.color, item.theme)}
                    style={[
                        styles.checkbox,
                        { backgroundColor: item.color, borderColor: selectedColor === item.color ? '#000' : '#fff' },
                    ]}
                >
                    <View style={[styles.circleView, {
                        backgroundColor: selectedColor === item.color ? '#FFF': item.color,
                        // color : item.theme === true ? Styles.colors.textGrey : Styles.colors.darkGrey,
                    }]}>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    checkbox: {
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    circleView: {
        padding: 8,
        borderRadius: 20
    }
});

export default ColorCheckboxMap;
