import React from 'react'
import { TouchableWithoutFeedback, Image } from 'react-native'
import Animated from 'react-native-reanimated'
import { COLORS } from '../constants/theme'

const TabButton = ({ label, icon, onPress, isFocused, outerContainerStyles, innerContainerStyles }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View
                style={[
                    {
                        flex:1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    outerContainerStyles
                ]}
            >
                <Animated.View
                    style={[
                        {
                            flexDirection:"row",
                            alignItems: "center",
                            justifyContent: "center",
                            height:50,
                            width:"80%",
                            borderRadius: 25,
                        },
                        innerContainerStyles
                    ]}
                >
                    <Image
                        source={icon}
                        style={{
                            width:20,
                            height:20,
                            tintColor: isFocused ? COLORS.white : COLORS.gray
                        }}
                    />

                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default TabButton