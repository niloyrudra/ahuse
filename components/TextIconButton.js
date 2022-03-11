import React from 'react'
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../constants/theme'

const TextIconButton = ( { label, disabled, labelStyle, containerStyle, icon, iconPosition, iconStyle, onPress } ) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                alignItems: "center",
                justifyContent: "center",
                ...containerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >

            {iconPosition == 'left' &&
                <Image
                    source={icon}
                    style={{...styles.image, ...iconStyle}}
                />
            }
            <Text
                style={{
                    color:COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            {iconPosition == 'right' &&
                <Image
                    source={icon}
                    style={{...styles.image, ...iconStyle}}
                />
            }

        </TouchableOpacity>
    )
}

export default TextIconButton

const styles = StyleSheet.create({
    image: {
        marginLeft: 5,
        width:20,
        height: 20,
        tintColor: COLORS.black
    }
});