import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { FONTS } from '../constants/theme'

const Header = ( { containerStyle, title, leftComponent, rightComponent } ) => {
    return (
        <View
            style={{
                flexDirection: "row",
                ...containerStyle
            }}
        >
            {/* Left */}
            {leftComponent}

            {/* Title */}
            <View
                style={{
                    flex:1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text style={{ ...FONTS.h3 }}>
                    {title}
                </Text>
            </View>

            {/* Right */}
            {rightComponent}
            
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
