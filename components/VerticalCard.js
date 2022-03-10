import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import constants from '../constants/constants';

// Constants
import icons from '../constants/icons';

import { COLORS ,FONTS ,SIZES } from '../constants/theme';
import utils from '../utils/Utils';

const VerticalCard = ( { containerStyle, item, imageStyle, onPress } ) => {
    return (
        <TouchableOpacity
            style={{
                width:200,
                borderRadius: SIZES.radius,
                alignItems:"center",
                padding: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Category & Favourite */}
            <View style={{ flexDirection:"row" }}>
                {/* Category */}
                <View
                    style={{
                        flexDirection:"row",
                        flex:1,
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
                {/* Favourite */}
                <Image
                    source={icons.love}
                    style={{
                        width:20,
                        height:20,
                        tintColor: item?.is_fav ? COLORS.primary : COLORS.gray
                    }}
                />
            </View>

            {/* Image */}
            <Image
                source={{uri:item.thumbnail}}
                style={imageStyle}
            />

            {/* Info */}
            <View
                style={{
                    flex:1,
                    alignItems:"center"
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3,
                        fontSize: 17,
                        textAlign:"center"
                    }}
                >{item?.title}</Text>
                {/* Address */}
                <Text
                    style={{
                        color: COLORS.darkGray2,
                        ...FONTS.body5,
                        textAlign:"center"
                    }}
                >{item?.address}</Text>

                {/* Price */}
                {/* <NumberFormat/> */}
                <Text
                    style={{
                        marginTop: SIZES.radius,
                        ...FONTS.h2,
                    }}
                >{constants.currency} { utils.thousandSeparator(item?.price)}</Text>

            </View>
            
        </TouchableOpacity>
    )
}

export default VerticalCard

const styles = StyleSheet.create({})
