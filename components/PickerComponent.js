import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Controller } from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import { COLORS, SIZES } from '../constants/theme';

const PickerComponent = ( {name,label,control, optionList} ) => {
    return (
        <>
            { label && <Text style={styles.label}>{ label }</Text>}
            <Controller
                control={ control }
                name={ name }
                render={({field: {onChange, value, onBlur}}) => (
                    <Picker
                        selectedValue={value}
                        style={styles.select}
                        onBlur={onBlur}
                        mode="dropdown" // dialog
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                        // itemStyle={{
                        //     color:COLORS.gray
                        // }}
                    >
                        <Picker.Item label={`...Select your option`} color={COLORS.darkGray2} value='' key={optionList.map( (e,i) => i == 0 && e.id.toString() )} />
                        {
                            optionList.map( option => (<Picker.Item label={ option.name } color={COLORS.darkGray2} value={ option.id } key={ (option.id + 1).toString() } />) )
                        }
                    </Picker>
                )}
            />
        </>
    )
}

export default PickerComponent

const styles = StyleSheet.create({
    label: {
        color: COLORS.primary,
        marginTop: 10,
        marginBottom:-10,
        marginLeft: 0,
    },
    select: {
        backgroundColor: COLORS.lightGray,
        borderColor: 'transparent',
        height: 30,
        padding: 10,
        borderRadius: SIZES.radius,
        marginTop: 15,
    },
});