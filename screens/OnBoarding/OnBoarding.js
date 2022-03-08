import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
     Image,
     Animated,
     ImageBackground
} from 'react-native';

import constants from '../../constants/constants'
import images from '../../constants/images';
import {COLORS,FONTS,SIZES} from '../../constants/theme'

import TextButton from '../../components/TabButton'

import { useDispatch, useSelector } from 'react-redux';
import { getTempToken } from '../../store/user/userActions';

const OnBoarding = ({navigation, route, }) => {

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch( getTempToken() ) 
    }, [])
   
    const scrollX = React.useRef( new Animated.Value(0) ).current
    const flatListRef = React.useRef()

    const [currentIndex, setCurrentIndex] = React.useState(0)

    const onViewChangeRef = React.useRef(({ viewableItems, changed }) => setCurrentIndex( viewableItems[0].index ) )

    // Component
    const Dots = () => {

        const dotPosition = Animated.divide( scrollX, SIZES.width )

        return (
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                {
                    constants.onboarding_screens.map( (item, index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [ index - 1, index, index + 1 ],
                            outputRange: [ COLORS.lightOrange, COLORS.primary, COLORS.lightOrange ],
                            extrapolate: "clamp"
                        });

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [ index - 1, index, index + 1 ],
                            outputRange: [ 10, 30, 10 ],
                            extrapolate: "clamp"
                        });
                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    backgroundColor: dotColor,
                                    borderRadius: 5,
                                    marginHorizontal:6,
                                    width: dotWidth,
                                    height:10

                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    // Render sections
    const renderHeaderLogo = () => {
        return (
            <View
                style={{
                    position:"absolute",
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right:0,
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <Image
                    // source={images.logo_02}
                    source={images.logo_00}
                    resizeMode='contain'
                    style={{
                        width: SIZES.width * 0.5,
                        height:100
                        // width: SIZES.width * 0.35,
                        // height:80
                    }}
                />
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    height:160
                }}
            >
                {/* pagination */}
                <View
                    style={{
                        flex:1,
                        justifyContent:"center"
                    }}
                >
                    <Dots />
                </View>
                
                {/* Button */}
                { currentIndex < constants.onboarding_screens.length - 1 &&
                
                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            // alignItems:"center",
                            paddingHorizontal:SIZES.padding,
                            marginVertical: SIZES.padding,
                            // backgroundColor:"blue"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                // backgroundColor: COLORS.primary,
                                backgroundColor:null
                            }}
                            onPress={() => navigation.navigate("SignIn")}
                        >
                            <Text
                                style={{
                                    // color:COLORS.white,
                                    ...FONTS.h3,
                                    color:COLORS.darkGray2
                                }}
                            >
                                Skip
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: COLORS.primary,
                                height:60,
                                width:200,
                                borderRadius:SIZES.radius
                            }}
                            onPress={() => {
                                // let index = Math.ceil( Number( scrollX._value / SIZES.width ) )

                                // if( index < constants.onboarding_screens.length - 1 ) {
                                    // Scroll to the next item
                                    flatListRef?.current?.scrollToIndex({
                                        index: currentIndex + 1,
                                        animated: true
                                    })
                                // }
                                // else{
                                //     navigation.navigate("SignIn")
                                // }
                            }}
                        >
                            <Text
                                style={{
                                    color:COLORS.white,
                                    ...FONTS.h3,
                                }}
                            >
                                Next
                            </Text>
                        </TouchableOpacity>

                    </View>
                }
                {
                    currentIndex == constants.onboarding_screens.length - 1 &&
                    <View
                        style={{
                            // flexDirection:"row",
                            justifyContent:"center",
                            paddingHorizontal:SIZES.padding,
                            marginVertical: SIZES.padding,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: COLORS.primary,
                                height:60,
                                borderRadius:SIZES.radius
                            }}
                            onPress={() => navigation.replace("SignIn")}
                        >
                            <Text
                                style={{
                                    color:COLORS.white,
                                    ...FONTS.h3,
                                }}
                            >
                                Let's Get Started
                            </Text>
                        </TouchableOpacity>

                    </View>
                }
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor:COLORS.white
            }}
        >
            {renderHeaderLogo()}

            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                
                // onScrollToIndexFailed={info => {
                //     const wait = new Promise(resolve => setTimeout(resolve, 700));
                //     wait.then(() => {
                //        flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
                //     });
                // }}
                onScrollToIndexFailed={()=>{}}

                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ],
                    {
                        useNativeDriver: false
                    }
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={item => `${item.id}`}
                renderItem={({item, index}) => {
                    return (
                        <View
                            style={{
                                width: SIZES.width
                            }}
                        >
                            {/* Header */}
                            <View
                                style={{
                                    flex:3
                                }}
                            >
                                <ImageBackground
                                    source={item.backgroundImage}
                                    // resizeMode='contain'
                                    style={{
                                        flex:1,
                                        alignItems:"center",
                                        justifyContent:"flex-end",
                                        height: '100%',
                                        top: index==1 ? "-8.8%" : null,
                                        width: "100%"
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode='contain'
                                        style={{
                                            width: SIZES.width * 0.8,
                                            height: SIZES.width * 0.8,
                                            marginBottom: index==1 ? -(SIZES.padding + 40) : -SIZES.padding
                                        }}
                                    />
                                </ImageBackground>
                            </View>

                            {/* Detail */}
                            <View
                                style={{
                                    flex:1,
                                    marginTop:30,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    paddingHorizontal:SIZES.radius
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h1,
                                        fontSize: 25
                                    }}
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    style={{
                                        marginTop:SIZES.radius,
                                        textAlign:"center",
                                        color:COLORS.darkGray,
                                        paddingHorizontal:SIZES.padding,
                                        ...FONTS.body3,
                                    }}
                                >
                                    {item.description}
                                </Text>

                            </View>

                        </View>
                    )
                }}
            />

            {renderFooter()}

        </View>
    )
}

export default OnBoarding;
// function mapStateToProps( state ) {
//     console.log(state?.userReducer)
//     return {
//         selectedTempToken: state?.userReducer?.tempToken,
//     }
// }

// function mapDispatchToProps( dispatch ) {
//     return {
//         setSelectedTempToken: selectedTempToken => dispatch( setTempToken(selectedTempToken) )
//     }
// }

// export default connect( mapStateToProps, mapDispatchToProps ) ( OnBoarding )