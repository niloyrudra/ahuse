import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTS, SIZES } from '../constants/theme'

import icons from '../constants/icons'

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{flex:1,...FONTS.h3}}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    {/* <Image
                        source={icons.love}
                    /> */}
                    <Text style={{color:COLORS.primary, ...FONTS.body3}}>Show All</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            {children}

        </View>
    )
}

export default Section

const styles = StyleSheet.create({})
