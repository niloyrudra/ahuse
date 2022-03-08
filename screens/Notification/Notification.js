import React from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Notification = ({ notification, route }) => {
    return (
        <View
            style={{
                flex:1,
                alignItems:"center",
                justifyContent:"flex-start",
                paddingHorizontal:SIZES.padding
            }}
        >
            <Image
                source={icons.noMsg}
                resizeMode='contain'
                style={{
                    width:'60%',
                    height:'60%',
                    tintColor:COLORS.lightGray1,
                    // marginBottom:SIZES.padding
                }}
            />
            <Text style={{color:COLORS.gray2,...FONTS.h3}}>No notifications found! Please come again later.</Text>
        </View>
    )
}

export default Notification;