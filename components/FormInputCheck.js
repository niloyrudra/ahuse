import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants/theme'
import icons from '../constants/icons'

const FormInputCheck = ({ value, error }) => {
    return (
        <View
            style={{
                justifyContent:"center"
            }}
        >
            <Image
                source={ value == '' || ( value != "" && error == "" ) ? icons.correct : icons.cancel }
                style={{
                    height:20,
                    width:20,
                    tintColor: ( value == '' ) ? COLORS.gray : ( value != "" && error == "" ) ? COLORS.green : COLORS.red
                }}
            />
        </View>
    )
}

export default FormInputCheck

const styles = StyleSheet.create({})
