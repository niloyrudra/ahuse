import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import constants from '../../constants/constants'
import images from '../../constants/images'
import icons from '../../constants/icons'
import {COLORS,FONTS,SIZES} from '../../constants/theme'

const AuthLayout = ({ title, subtitle, titleContainerStyle, children }) => {
    return (
        <View
            style={{
                flex:1,
                paddingVertical: SIZES.padding,
                backgroundColor: COLORS.white,
                ...titleContainerStyle
            }}
        >
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    flex:1,
                    paddingHorizontal:SIZES.padding
                }}
            >
                {/* App LOGO */}
                <View
                    style={{
                        alignItems:"center"
                    }}
                >
                    <Image
                        source={images.logo_00}
                        resizeMode='contain'
                        style={{
                            height:100,
                            width:200
                        }}
                    />
                </View>

                {/* Title & Sub title */}
                <View
                    style={{
                        marginTop:SIZES.padding,
                        ...titleContainerStyle
                    }}
                >
                    <Text
                        style={{
                            textAlign:"center",
                            ...FONTS.h2
                        }}
                    >
                        {title}
                    </Text>

                    <Text
                        style={{
                            textAlign:"center",
                            color:COLORS.darkGray,
                            marginTop: SIZES.base,
                            ...FONTS.body3
                        }}
                    >
                        {subtitle}
                    </Text>
                </View>

                {/* Children / Content */}
                {children}

            </KeyboardAwareScrollView>
        </View>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})
