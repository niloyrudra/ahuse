import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

// Contants
import { COLORS, FONTS, SIZES } from '../constants/theme'
import icons from '../constants/icons'

const CartQuantityButton = ({ navigation, containerStyle, quantity, iconStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width:40,
                height:40,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightOrange2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icons.cart}
                style={{
                    width:20,
                    height:20,
                    ...iconStyle
                }}
            />
            <View
                style={{
                    position:"absolute",
                    top:5,
                    right:5,
                    width:15,
                    height:15,
                    alignItems:"center",
                    justifyContent: 'center',
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.primary
                }}
            >
                <Text
                    style={{
                        color:COLORS.white,
                        ...FONTS.body5,
                        lineHeight:0,
                        fontSize:10
                    }}
                >{quantity}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CartQuantityButton

const styles = StyleSheet.create({})
