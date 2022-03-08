import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants/theme'
import icons from '../constants/icons'

const RadioButton = ({ containerStyle, label, labelStyle, iconStyle, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                ...containerStyle
            }}
            onPress={onPress}
        >

            <Image
                source={ isSelected ? icons.check_on : icons.check_off }
                style={{
                    width:20,
                    height:20,
                    marginLeft:5,
                    ...iconStyle
                }}
            />

            <Text
                style={{
                    marginLeft:SIZES.radius,
                    color:COLORS.gray,
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default RadioButton

const styles = StyleSheet.create({})
