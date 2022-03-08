import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants/theme'

const FormInput = ({ containerStyle, label, placeholder, inputStyle, prependComponent, appendComponent, onChange, secureTextEntry, maxLength, keyboardType= "default", autoCompleteType="off", autoCapitalize="none", errorMsg = "" }) => {

    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            {/* label & error msg */}
            <View
                style={{
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}
            >
                <Text style={{color:COLORS.gray, ...FONTS.h3}}>
                    {label}
                </Text>
                <Text style={{
                    color:COLORS.red,
                    ...FONTS.body4
                }}>
                    {errorMsg}
                </Text>
            </View>

            {/*  Text Input */}
            <View
                style={{
                    flexDirection:"row",
                    height:55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor:COLORS.lightGray2
                }}
            >
                {prependComponent}

                <TextInput
                    style={{
                        flex:1,
                        ...inputStyle
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={(text) => onChange(text)}
                />

                {appendComponent}

            </View>

        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({})
