import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import TextButton from './TextButton'
import LineDivider from './LineDivider'

import { COLORS,SIZES,FONTS } from '../constants/theme'
import constants from '../constants/constants'
import utils from '../utils/Utils'



const FooterTotal = ({subTotal, total, fee, checkout, onPress}) => {
    return (
        <View>
            {/* Shadow */}
            <LinearGradient
                start={{x:0, y:0}}
                end={{x:0, y:1}}
                colors={[COLORS.transparent, COLORS.lightGray1]}
                style={{
                    position:'absolute',
                    top:-15,
                    left:0,
                    right:0,
                    height:Platform.OS === 'ios' ? 200 : 50,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15

                }}
            />

            {/* Order Details */}
            <View
                style={{
                    padding:SIZES.padding,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor:COLORS.white
                }}
            >

                {/* SubTotal */}
                {
                    !checkout ?
                        <>

                            <View
                                style={{
                                    flexDirection:'row',
                                
                                }}
                            >
                                <Text style={{flex:1,...FONTS.body3}}>
                                    Subtotal
                                </Text>
                                <Text style={{...FONTS.h3}}>
                                    {constants.currency} { subTotal ? utils.thousandSeparator( subTotal?.toFixed(2) ) : '00.00' }
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection:'row',
                                    marginTop:SIZES.base,
                                    marginBottom:SIZES.padding
                                }}
                            >
                                <Text style={{flex:1,color:COLORS.gray,...FONTS.body3}}>
                                    Transactional Fee
                                </Text>
                                <Text style={{color:COLORS.gray,...FONTS.h3}}>
                                    {constants.currency} { fee ? fee?.toFixed(2) : '00.00'}
                                </Text>
                            </View>

                            <LineDivider/>

                            <View
                                style={{
                                    flexDirection:'row',
                                    marginTop:SIZES.padding,
                                    // marginBottom:SIZES.padding
                                }}
                            >
                                <Text style={{flex:1,...FONTS.h2}}>
                                    Total:
                                </Text>
                                <Text style={{...FONTS.h2}}>
                                    {constants.currency} { total ? utils.thousandSeparator( total?.toFixed(2) ) : '00.00'}
                                </Text>
                            </View>
                        </>
                    :
                        <View
                            style={{
                                flexDirection:'row',
                                marginTop:SIZES.padding,
                                // marginBottom:SIZES.padding
                            }}
                        >
                            <Text style={{flex:1,...FONTS.h2}}>
                                Total:
                            </Text>
                            <Text style={{...FONTS.h2}}>
                                {constants.currency} { total ? utils.thousandSeparator( total?.toFixed(2) ) : '00.00'}
                            </Text>
                        </View>

                }


                {/* Total */}

                {/* Button */}
                <TextButton
                    buttonContainerStyle={{
                        height:60,
                        marginTop: SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    label="Place Your Order"
                    onPress={onPress}
                />

            </View>

        </View>
    )
}

export default FooterTotal

const styles = StyleSheet.create({})
