import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import TopProfileButton from '../../components/TopProfileButton';
import Header from '../../components/Header';
// import IconButton from '../../components/IconButton';
import FormInput from '../../components/FormInput'
// import StepperInput from '../../components/StepperInput';
import FooterTotal from '../../components/FooterTotal';
import CardItem from '../../components/CardItem';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteSoldCartItemAction } from '../../store/cart/cartActions'

import { FONTS,COLORS,SIZES } from '../../constants/theme';
import icons from '../../constants/icons';

import constants, { myCards } from '../../constants/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [ selectedCard, setSelectedCard ] = React.useState(null)
    const [cartList, setCartList] = React.useState([])
    const [prices, setPrices] = React.useState([])

    const selectedCartItems = useSelector( state => state.cartReducer.cartItems )

    React.useEffect(() => {
        if( route.params ){
            let { selectedCard } = route.params
            if(selectedCard) setSelectedCard(selectedCard)
        }
    }, [])

    React.useEffect(() => {
        if(cartList.length>0){
            cartList.forEach( item => {
                const price = item.price ? item.price : 0
                setPrices( [...new Set([...prices, price])] )
            } )

            console.log(prices)
        }
    }, [cartList.length])

    const sumOfPrices = (sum, num) => {
        return sum + Math.round(num);
    }

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
        if(selectedCartItems) setCartList(selectedCartItems)
    }, [selectedCartItems])

    React.useEffect(() => {
        if(cartList.length>0){
            cartList.forEach( (item) => {
                // const price = item.cartItem.price ? item.cartItem.price*item.quantity : 0
                const price = item.cartItem.price ? item.cartItem.price : 0
                setPrices( [...new Set([...prices, price])] )
            } )
        }
        else{
            setPrices([])
        }
        return () => setPrices([])
    }, [cartList.length])

    // Render Sections
    const renderCards = () => {
        return (
            <View>
                {
                    selectedCard && myCards.map( ( item, index ) => (
                        <CardItem
                            key={`MyCard-${item.id}`}
                            item={item}
                            isSelected={`${selectedCard?.key}-${selectedCard?.id}` == `MyCard-${item?.id}`}
                            onPress={() => setSelectedCard({...item, key: "MyCard"})}
                        />
                    ) )
                }
            </View>
        )
    }

    const renderDeliveryAddress = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text style={{...FONTS.h3}}>Delivery Address</Text>

                <View
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
                        marginTop:SIZES.radius,
                        paddingVertical:SIZES.radius,
                        paddingHorizontal:SIZES.padding,
                        borderRadius:SIZES.radius,
                        borderWidth:2,
                        borderColor:COLORS.lightGray2
                    }}
                >
                    <Image
                        source={icons.location1}
                        style={{
                            width:40,
                            height:40
                        }}
                    />
                    <Text style={{marginLeft:SIZES.radius,width:'85%',...FONTS.body3}}>300 Post Street San Francisco, CA</Text>
                </View>

            </View>
        )
    }

    const renderCoupon = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text style={{...FONTS.h3}}>Add Coupon</Text>

                <FormInput
                    inputContainerStyle={{
                        marginTop:0,
                        paddingLeft:SIZES.padding,
                        paddingRight:0,
                        // borderRadius:SIZES.radius,
                        borderWidth:2,
                        backgroundColor:COLORS.white,
                        borderColor: COLORS.lightGray2,
                        overflow: 'hidden'
                    }}
                    placeholder="Coupon Code"
                    appendComponent={
                        <View
                        style={{
                            width:60,
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:COLORS.primary
                        }}>
                            <Image
                                source={icons.discount}
                                style={{
                                    width:40,
                                    height:40
                                }}
                            />
                        </View>
                    }
                />

            </View>
        )
    }

    return (
        <Animated.View
            style={{
                flex: 1,
                 backgroundColor: COLORS.white,
                 ...animatedStyle
            }}
        >
            {/* Header */}
            <Header
                containerStyle={{
                    height:50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}
                title='Checkout'
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            height:40,
                            justifyContent:"center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
                        }}
                        // onPress={() => navigation.goBack()}
                        onPress={() => navigation.navigate("MyCards")}
                    >
                        <Image
                            source={icons.back}
                            style={{
                                width:20,
                                height:20,
                                tintColor:COLORS.gray2
                            }}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TopProfileButton navigation={navigation} />
                }
            />

            {/* Cart List */}
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                extraScrollHeight={-200}

                contentContainerStyle={{
                    flexGrow:1,
                    // marginTop:SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20
                }}
            >
                {/* My Card */}
                {renderCards()}

                {/* Delivery Address */}
                {renderDeliveryAddress()}

                {/* Coupon */}
                {renderCoupon()}

            </KeyboardAwareScrollView>

            {/* Footer */}
            <FooterTotal
                total={prices ? prices?.reduce((accumulator, current) => sumOfPrices(accumulator,current)*(1+constants.fees), 0) : 0 }
                checkout={true}
                onPress={() => {
                    dispatch( deleteSoldCartItemAction() )
                    setCartList([])
                    setPrices('')
                    navigation.navigate("Success")
                }}
            />

        </Animated.View>
    )
}

export default Checkout

const styles = StyleSheet.create({})
