import React, {useState} from 'react';
import {View, Button,Text, Platform, StyleSheet, TextInput} from 'react-native';
import { Controller } from 'react-hook-form';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import tw from 'twrnc';
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const DatePickerComponent = ( {name, control, label='' } ) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      {/* { label && <Text style={styles.label}>{ label }</Text>} */}
      <Controller
        control={ control }
        name={ name }
        render={({field: {onChange, value, onBlur}}) => (
          <View
            style={{
              marginVertical:SIZES.radius
            }}
          >
            <TouchableOpacity
              // style={styles.button}
              style={{
                  flex:1,
                  backgroundColor:COLORS.lightGray,
                  color:COLORS.gray,
                  borderRadius:SIZES.radius,
                  padding:SIZES.radius,
                  justifyContent:"center",
                  // height:40
                }}
              onPress={showDatePicker}
            >
              <Text style={{color:COLORS.gray, ...FONTS.body3}}>{value ? value.toString() : label}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              value={value}
              onConfirm={newValue => {
                handleConfirm(newValue)
                onChange(newValue)
                console.log(newValue)
                console.log(value)
              }}
              onCancel={hideDatePicker}
            />
          </View>
        )}
      />

    </>
  );
};

export default DatePickerComponent

const styles = StyleSheet.create({
    button: {
        height: 55,
        // backgroundColor: '#ec5990',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        justifyContent:"center",
        alignItems:"center"
      },
})