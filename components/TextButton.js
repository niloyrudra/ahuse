import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../constants/theme'

const TextButton = ( { label, disabled, labelStyle, buttonContainerStyle, label2="", label2Style, onPress } ) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={{
                    color:COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            {
                label2 !== '' &&
                <Text
                    style={{
                        flex:1,
                        textAlign:"right",
                        color:COLORS.white,
                        ...FONTS.h3,
                        ...label2Style
                    }}
                >
                    {label2}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default TextButton