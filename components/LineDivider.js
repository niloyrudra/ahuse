import React from 'react'
import { Text, View } from 'react-native'

import { COLORS } from '../constants/theme'

const LineDivider = ({lineStyle}) => {
    return (
        <>
            <View
                style={{
                    height:2,
                    width:'100%',
                    backgroundColor:COLORS.lightGray2,
                    ...lineStyle
                }}
            />
        </>
    );
}

export default LineDivider