import React from 'react'
import { Text, View, Switch } from 'react-native'
import { Controller } from 'react-hook-form';
import { COLORS } from '../constants/theme';

// import tw from 'twrnc';

const SwitchButtonComponent = ( props ) => {
    // console.log(props.name)
    return (
        <View style={{
            flex:1,
            flexDirection:"row",
            // borderTopColor: COLORS.gray2,
            // borderTopWidth:1,
            justifyContent:"space-between",
            alignItems:"center"
        }}>
            <Text style={{ color:COLORS.darkGray, ...props.customLabelCss }}>{ props.label }</Text>

            <Controller
                control={props.control}
                name={ props.name }
                // render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState, }) => (
                render={({ field: { onChange, onBlur, value  }}) => (
                    <Switch
                        trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
                        thumbColor={value ? COLORS.primary : "#f4f3f4"} // "#81b0ff"
                        // ios_backgroundColor="#3e3e3e"
                        onValueChange={ val => onChange(val)}
                        value={value}
                    />
                )}
            />
        </View>
    )
}

export default SwitchButtonComponent