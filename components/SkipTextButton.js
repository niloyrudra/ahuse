import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TextButton from './TextButton'

import { COLORS, SIZES, FONTS } from '../constants/theme'

const SkipTextButton = ({onPress}) => {
    return (
        <TextButton
            label="Skip"
            labelStyle={{
                ...FONTS.h3,
                color:COLORS.darkGray2
            }}
            buttonContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                position:"absolute",
                top:SIZES.padding,
                right:SIZES.padding,
                backgroundColor:null
            }}
            onPress={onPress}
        />
    )
}

export default SkipTextButton

const styles = StyleSheet.create({})
