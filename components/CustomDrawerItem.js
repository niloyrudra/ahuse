import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import icons from '../constants/icons'
import {COLORS, SIZES, FONTS} from '../constants/theme'

const CustomDrawerItem = ({ label, icon, onPress, containerStyle, isFocused }) => {

    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                height: 40,
                marginBottom: SIZES.base,
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                alignItems: "center",
                backgroundColor: isFocused ? COLORS.transparentBlack1 : null 
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width:20,
                    height:20,
                    tintColor: COLORS.white
                }}
            />
            <Text
                style={{
                    marginLeft:15,
                    color:COLORS.white,
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomDrawerItem

const styles = StyleSheet.create({})
