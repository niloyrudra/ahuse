import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { COLORS, FONTS, SIZES } from '../constants/theme';

const CustomSwitch = ({ value, onChange }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => onChange(!value)}
            // onPress={() => onChange([].push(value))}
            // onPress={onChange}
        >
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginTop:SIZES.radius
                }}
            >
                {/* Switch */}
                <View
                    style={ value ? styles.switchOnContainer : styles.switchOffContainer }
                >
                    <View
                        style={{
                            ...styles.dot,
                            backgroundColor: value ? COLORS.white : COLORS.gray
                        }}
                    />
                </View>
                {/* Label */}
                <Text style={{
                    color: value ? COLORS.primary : COLORS.gray,
                    marginLeft: SIZES.base,
                    ...FONTS.body4
                }}>
                    Save Me
                </Text>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default CustomSwitch

const styles = StyleSheet.create({
    switchOnContainer: {
        width:40,
        height:20,
        justifyContent: 'center',
        alignItems:"flex-end",
        borderRadius: 10,
        paddingRight:3,
        backgroundColor: COLORS.primary
    },
    switchOffContainer: {
        width:40,
        height:20,
        paddingLeft:2,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:COLORS.gray,
        borderRadius: 10,
        backgroundColor: COLORS.white
    },
    dot: {
        width:12,
        height:12,
        borderRadius:6
    }
})
