import React from 'react'
import { StyleSheet, Text, View, Platform, Image } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants/theme'
import images from '../constants/images'
import icons from '../constants/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PropertyCreatorCardDetail = ({navigation, property}) => {
    return (
        <View
        style={{
            flex:1,
            flexDirection:"row",
            alignItems: "center",
            // padding: SIZES.padding
        }}
    >
        {/* Profile Image */}
        <View
            style={{
                width:40,
                height:40,
                marginLeft:20
            }}
        >
            <Image
                source={images.profile}
                style={{
                    width:40,
                    height:40,
                    borderRadius: 20,
                }}
            />
        </View>

        {/* Creator's info */}
        <View
            style={{
                flex:1,
                marginHorizontal:20
            }}
        >
            <Text style={{...FONTS.body4, color:COLORS.lightGray2 }}>
                Posted by
            </Text>
            <Text style={{...FONTS.h3, color:COLORS.white2 }}>
                {property?.author_name}
            </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
            style={{
                width:30,
                height:30,
                alignItems: "center",
                justifyContent:"center",
                marginRight:20,
                borderRadius:5,
                borderWidth:1,
                borderColor: COLORS.lightGreen1
            }}
            onPress={() => navigation.navigate("Profile", {creator: property.author_name})}
        >
            <Image
                source={icons.rightArrow}
                style={{
                    width:15,
                    height:15,
                    tintColor: COLORS.lightGreen1
                }}
            />
        </TouchableOpacity>
    </View>
    )
}

export default PropertyCreatorCardDetail

const styles = StyleSheet.create({})
