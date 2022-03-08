import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS } from '../constants/theme'

const IconButton = ( { containerStyle, icon, iconStyle, onPress } ) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{...containerStyle}}
        >
            <Image
                source={icon}
                style={{
                    width:30,
                    height:30,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({})
