import React from 'react'
import { Platform, StyleSheet, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form';

import {COLORS,FONTS,SIZES} from '../constants/theme'

const TextInputComponent = ( props ) => {
    const {name, kbType, numberOfLines, multiline, textAlignVertical="", label, onFocus, isRequired, control, placeholder='', errors, errorMsg='', additionalCss} = props
    return (
        <>
            { label && <Text style={styles.label}>{ label }</Text>}
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={{...styles.input, ...additionalCss}}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        multiline={multiline ? true : false}
                        numberOfLines={numberOfLines ? numberOfLines : 1}
                        onChangeText={value => onChange(value)}
                        textAlignVertical="top"
                        value={value?.toString()}
                        underlineColorAndroid="transparent"
                        keyboardType={ kbType ? kbType : "default"}
                        onFocus={onFocus}
                    />
                )}
                name={name}
                rules={{ required: isRequired ? { value: true, message: errorMsg } : isRequired }}
            />
            {
                isRequired && errors[name] && <Text style={styles.errorMessage}>{errors[name].message}</Text>
            }
        </>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.lightGray,
        borderRadius:SIZES.radius,
        borderColor: 'transparent',
        height: 40,
        padding: 10,
        borderRadius: 4,
        marginTop: 15,
        ...FONTS.body3
    },
    label: {
        color: COLORS.gray,
        marginTop: SIZES.padding
    },
    errorMessage:{
        color:'red',
        marginTop:4,
        letterSpacing:0.5,
        ...FONTS.body5
    },
});