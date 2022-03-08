import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

// Constants
import constants from '../constants/constants';
import icons from '../constants/icons';

import { COLORS ,FONTS ,SIZES } from '../constants/theme';
import utils from '../utils/Utils';

const HorizontalCard = ( { containerStyle, item, imageStyle, onPress } ) => {
    // console.log(imageStyle)
    return (
        <TouchableOpacity
        style={{
            flexDirection: "row",
            borderRadius: SIZES.radius,
            // alignItems:"center",
            // justifyContent:"center",
            backgroundColor: COLORS.lightGray2,
            ...containerStyle
        }}
            onPress={onPress}
        >
            {/* Image */}
            <Image
                source={{uri:item.thumbnail}}
                style={imageStyle}
            />

            {/* Info */}
            <View
                style={{
                    flex:1,
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3,
                        fontSize: 17
                    }}
                >{item?.title}</Text>
                {/* Address */}
                <Text
                    style={{
                        color: COLORS.darkGray2,
                        ...FONTS.body4
                    }}
                >{item?.address}</Text>

                {/* Price */}
                {/* <NumberFormat/> */}
                <Text
                    style={{
                        marginTop: SIZES.base,
                        ...FONTS.h2,
                    }}
                >{constants.currency} { utils.thousandSeparator(item?.price)}</Text>

            </View>

            {/* Category */}
            <View
                style={{
                    flexDirection:"row",
                    position: "absolute",
                    top: 5,
                    right: SIZES.radius
                }}
            >
                <Image
                    source={icons.category}
                    style={{
                        width:15,
                        height:15
                    }}
                />
                <Text style={{color:COLORS.darkGray2, marginLeft:SIZES.radius, ...FONTS.body5}}>
                    {item?.cat_names[0]}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default HorizontalCard

const styles = StyleSheet.create({})
