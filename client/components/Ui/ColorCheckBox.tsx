import React, { useState } from 'react';
import {  ScrollView, StyleSheet,  Text, Pressable, View } from 'react-native';

interface ColorCheckboxMapProps {
    colorData: any;
}

const ColorCheckboxMap = ({colorData}: ColorCheckboxMapProps) => {
    const [selectedColor, setSelectedColor] = useState(null);

    // Sample color data
    // const colorData = [
    //     { id: 1, color: '#FF5733' },
    //     { id: 2, color: '#33FF57' },
    //     { id: 3, color: '#4bff33' },
    //     { id: 4, color: '#ffcc33' },
    //     { id: 5, color: '#ff3355' },
    //     { id: 6, color: '#4b33ff' },
    //     { id: 7, color: '#020f07' },
    // ];

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
            {colorData.map((item) => (
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
