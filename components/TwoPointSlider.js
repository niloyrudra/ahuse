import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider' 

// Constants
import { COLORS, FONTS, SIZES } from '../constants/theme'

const TwoPointSlider = ( { values, min, max, step, onValuesChange, prefix, postfix } ) => {
    return (
        <>
            <MultiSlider
                values={values}
                sliderLength={SIZES.width - ( SIZES.padding * 2 ) - 20}
                min={min}
                max={max}
                step={step?step:1}
                markerOffsetY={20}
                selectedStyle={{
                    backgroundColor: COLORS.primary
                }}
                trackStyle={{
                    height:10,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray2
                }}
                minMarkerOverlapDistance={50}
                customMarker={(e) => {
                    return (
                        <View
                            style={{
                                height:60,
                                alignItems:"center",
                                justifyContent: "center"
                            }}
                        >
                            <View
                                style={{
                                    height:30,
                                    width: 30,
                                    borderWidth:4,
                                    borderRadius: 15,
                                    borderColor:COLORS.white,
                                    backgroundColor: COLORS.primary,
                                    ...styles.shadow
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                     color: COLORS.darkGray,
                                     ...FONTS.body5
                                }}
                                numberOfLines={1}
                            >
                                {prefix}{e.currentValue} {postfix}
                            </Text>
                        </View>
                    )
                }}
                onValuesChange={(values) => onValuesChange(values)}
            />
        </>
    )
}

export default TwoPointSlider

const styles = StyleSheet.create({
    shadow:{
        shadowColor:COLORS.black,
        shadowOffset: {
            width:0,
            height:3
        },
        shadowRadius:1,
        shadowOpacity:0.1
    }
})
