import React from 'react'
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import { FONTS,COLORS,SIZES } from '../../constants/theme';
import icons from '../../constants/icons';
import images from '../../constants/images';
import TextButton from '../../components/TextButton';

const Success = ( { navigation, route } ) => {
    const progress = useDrawerProgress()
    const scale = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [1, 0.8]
    } )
    const borderRadius = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [0, 26]
    } )
    const animatedStyle = { borderRadius, transform: [{scale}] }

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', () => {return true} )

        return () => {
            backHandler.remove()
        }
    }, [])

    return (
        <Animated.View
            style={{
                flex: 1,
                 backgroundColor: COLORS.white,
                 paddingHorizontal: SIZES.padding,
                 ...animatedStyle
            }}
        >
            <View
                style={{
                    flex:1,
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >

                <Image
                    source={images.success}
                    resizeMode='contain'
                    style={{
                        width:1150,
                        height:150
                    }}
                />

                <Text style={{
                    marginTop:SIZES.padding,
                    ...FONTS.h1
                }}>Congratulations</Text>

                <Text
                    style={{
                        textAlign:"center",
                        marginTop:SIZES.base,
                        color:COLORS.darkGray,
                        ...FONTS.body3
                    }}
                >
                    Payment was successfully made.
                </Text>

            </View>

            <TextButton
                label="Done"
                buttonContainerStyle={{
                    height:60,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={() => navigation.navigate("MainLayout")}
            />

        </Animated.View>
    )
}

export default Success

const styles = StyleSheet.create({})
