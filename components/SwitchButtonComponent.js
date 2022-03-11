import React from 'react'
import { Text, View, Switch } from 'react-native'
import { Controller } from 'react-hook-form';
import { COLORS } from '../constants/theme';

const SwitchButtonComponent = ( props ) => {
    return (
        <View style={{
            flex:1,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        }}>
            <Text style={{ color:COLORS.darkGray, ...props.customLabelCss }}>{ props.label }</Text>

            <Controller
                control={props.control}
                name={ props.name }
                render={({ field: { onChange, onBlur, value  }}) => (
                    <Switch
                        trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
                        thumbColor={value ? COLORS.primary : "#f4f3f4"}
                        onValueChange={ val => onChange(val)}
                        value={value}
                    />
                )}
            />
        </View>
    )
}

export default SwitchButtonComponent