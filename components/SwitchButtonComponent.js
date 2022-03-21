import React from 'react'
import { Text, View, Switch } from 'react-native'
import { Controller } from 'react-hook-form';
import { COLORS } from '../constants/theme';

const SwitchButtonComponent = ( props ) => {
    const currentValue = React.useRef(false)
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
                        // ref={props.stripeRef}
                        trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
                        thumbColor={value ? COLORS.primary : "#f4f3f4"}
                        onValueChange={ val => {
                            if( props.handleStripeModal ) {
                                props.handleStripeModal(val)
                            }

                            // if(props?.stripeRef?.current == null) props.stripeRef.current = true
                            // // }
                            // // currentValue.current = val
                            // console.log("value",val)
                            console.log("stripeRef Value >>",props?.stripeRef?.current)

                            if(props?.stripeRef?.current === false  ) onChange(false)
                            else onChange(val)
                        }}
                        value={value}
                    />
                )}
            />
        </View>
    )
}

export default SwitchButtonComponent