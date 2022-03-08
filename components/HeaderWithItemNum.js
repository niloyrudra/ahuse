import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS,SIZES,FONTS } from '../constants/theme'

const HeaderWithItemNum = ({label,length=0, containerStyle}) => {
    return (
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                paddingHorizontal: SIZES.padding,
                paddingBottom: 20,
                marginTop: SIZES.radius,
                ...containerStyle
            }}
        >
            <Text
                style={{
                    flex:1,
                    ...FONTS.h2
                }}
            >
                {label}
            </Text>

            <Text
                style={{
                    color:COLORS.gray2,
                    ...FONTS.body4
                }}
            >
                {length} item(s)
            </Text>

        </View>
    )
}

export default HeaderWithItemNum

const styles = StyleSheet.create({})
