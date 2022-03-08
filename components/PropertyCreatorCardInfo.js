import React from 'react'
import { StyleSheet, Text, View, Platform, Image } from 'react-native'

// import { BlurView } from '@react-native-community/blur'
import { COLORS, FONTS, SIZES } from '../constants/theme'
import images from '../constants/images'
import PropertyCreatorCardDetail from './PropertyCreatorCardDetail'

const PropertyCreatorCardInfo = ({navigation, property}) => {

    // if(Platform.OS === 'ios') {
    //     return (
    //         <BlurView
    //             style={{
    //                 flex:1,
    //                 borderRadius: SIZES.radius
    //             }}
    //             blurType='dark'
    //         >
    //             <PropertyCreatorCardDetail property={property} />
    //         </BlurView>
    //     )
    // }
    // else {
        return (
            <View
                style={{
                    flex:1,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.transparentBlack7
                }}
            >
                <PropertyCreatorCardDetail property={property} />
            </View>
        )
    // }
}

export default PropertyCreatorCardInfo

const styles = StyleSheet.create({})
