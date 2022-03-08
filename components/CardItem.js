import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native'

import { FONTS,COLORS,SIZES } from '../constants/theme';
import icons from '../constants/icons';

const CardItem = ( { item, isSelected, disabled, onPress } ) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:'row',
                height:100,
                alignItems:'center',
                marginTop:SIZES.radius,
                paddingHorizontal:SIZES.padding,
                borderRadius:SIZES.radius,
                borderWidth:2,
                borderColor: isSelected ? COLORS.primary : COLORS.lightGray2
            }}
            onPress={onPress}
            disabled={disabled}
        >
            {/* Card Image */}
            <View
                style={{
                    width:60,
                    height:45,
                    alignItems:'center',
                    justifyContent:'center',
                    borderWidth:2,
                    borderRadius:SIZES.radius,
                    borderColor:COLORS.lightGray
                }}
            >
                <Image
                    source={item.icon}
                    resizeMode='center'
                    style={{
                        width:35,
                        height:35
                    }}
                />
            </View>

            {/* Card Name */}
            <Text
                style={{
                    flex:1,
                    marginTop:SIZES.radius,

                    ...FONTS.h3
                }}
            >
                {item.name}
            </Text>

            {/* Radio Button */}
            <Image
                source={ isSelected ? icons.check_on : icons.check_off }
                style={{
                    width:35,
                    height:35
                }}
            />

        </TouchableOpacity>
    )
}

export default CardItem

const styles = StyleSheet.create({})
