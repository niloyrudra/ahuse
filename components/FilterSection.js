import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// Constants
import { COLORS, FONTS, SIZES } from '../constants/theme'
import icons from '../constants/icons'

const FilterSection = (props) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                ...props.containerStyle
            }}
        >
            <Text
                style={{
                    ...FONTS.h3
                }}
            >
                {props.title}
            </Text>

            {props.children}

        </View>
    )
}

export default FilterSection

const styles = StyleSheet.create({})
