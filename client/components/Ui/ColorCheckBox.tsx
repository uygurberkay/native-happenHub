import React, { useState } from 'react';
import {  ScrollView, StyleSheet,  Text, Pressable, View } from 'react-native';

interface ColorCheckboxMapProps {
    colorData: any;
    selectedColor: any;
    setSelectedColor: any;
}

const ColorCheckboxMap = ({colorData, selectedColor, setSelectedColor}: ColorCheckboxMapProps) => {

    const toggleColor = (color: any) => {
        // Check if the color is already selected, then remove it; otherwise, set it as the selected color
        setSelectedColor((prevSelectedColor: any) => (prevSelectedColor === color ? null : color));
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
                onPress={() => toggleColor(item.color)}
                style={[
                    styles.checkbox,
                    { backgroundColor: item.color, borderColor: selectedColor === item.color ? '#000' : '#fff' },
                ]}
                >
                    <View style={[styles.circleView, {
                        backgroundColor: selectedColor === item.color ? '#FFF': item.color,
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
