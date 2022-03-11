import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import constants from '../../constants/constants'
import images from '../../constants/images'
// import icons from '../../constants/icons'
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

                <View
                    style={{
                        alignItems:"center"
                    }}
                >
                    <Image
                        source={images.logo_01}
                        resizeMode='contain'
                        style={{
                            width: SIZES.width * 0.5,
                            height:100,
                            tintColor:COLORS.primary,
                            marginTop:16
                        }}
                    />
                </View>

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

                {children}

            </KeyboardAwareScrollView>
        </View>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})
