import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItemAction } from '../../store/cart/cartActions';

// Components
// import TopProfileButton from '../../components/TopProfileButton';
import Header from '../../components/Header';
import IconButton from '../../components/IconButton';
// import CartQuantityButton from '../../components/CartQuantityButton';
import StepperInput from '../../components/StepperInput';
import FooterTotal from '../../components/FooterTotal';
import constants from '../../constants/constants';
import TextButton from '../../components/TextButton';

import { FONTS,COLORS,SIZES } from '../../constants/theme';
import icons from '../../constants/icons';
import utils from '../../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cart = ( { navigation, route } ) => {
    const dispatch = useDispatch()
    const [cartList, setCartList] = React.useState([])
    // const [qnt, setQnt] = React.useState(1)
    const [prices, setPrices] = React.useState([])

    const selectedCartItems = useSelector( state => state?.cartReducer?.cartItems )

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
        const updateCartList = async (newCartList) => {
            try{
                await AsyncStorage.setItem("cartList", JSON.stringify(newCartList))
            }
            catch(err) {
                console.log("Cart Items failed to store at local storage!", err)
            }
        }
        const getCartList = async () => {
            try{
               const cartList = await AsyncStorage.getItem("cartList")
               if( cartList ) setCartList(cartList)
            }
            catch(err) {
                console.log("Fetching Cart Items from local storage failed!", err)
            }
        }

        if(selectedCartItems) {
            setCartList(selectedCartItems)
            updateCartList(selectedCartItems)
        }
        else{
            getCartList()
        }

        return () => {
            setCartList([])
        }
    }, [selectedCartItems])
    
    // Render Sections
    const renderCartList = () => {
        return (
            <SwipeListView
                data={cartList}
                keyExtractor={item => `cart-id-${item.cartId}`}
                style={{
                    marginTop:SIZES.radius,
                    paddingHorizontal:SIZES.padding,
                    paddingBottom:SIZES.padding * 2
                }}
                disableRightSwipe={true}
                rightOpenValue={-75}
                renderItem={ ({item}, rowMap) => {

                    return (
                    <View style={{
                        height:100,
                        backgroundColor:COLORS.lightGray2,
                        ...styles.cartItemContainer
                    }}>
                        <View
                            style={{
                                width:90,
                                height:100,
                                marginLeft:-10,

                                paddingVertical:10
                            }}
                        >
                            <Image
                                source={{uri:item.cartItem.thumbnail}}
                                style={{
                                    width:'100%',
                                    height: '100%',
                                    borderRadius:SIZES.radius
                                }}
                            />
                        </View>

                        {/* Info */}
                        <View
                            style={{
                                flex:1,
                                marginLeft:10
                            }}
                        >
                            <Text
                                style={{...FONTS.body3}}
                            >
                                {item.cartItem.title}
                            </Text>

                            <View style={{flexDirection:"row",marginTop:SIZES.base}}>
                                <Image
                                    source={icons.locationPin}
                                    style={{
                                        width:14,
                                        height:14,
                                        tintColor:COLORS.gray2,
                                        marginRight:SIZES.base
                                    }}
                                />
                                <Text
                                    style={{color:COLORS.gray,...FONTS.body4}}
                                    numberOfLines={1}
                                >
                                    {item?.cartItem?.address}
                                </Text>
                            </View>

                        </View>

                        {/* Quantity */}
                        {/* <StepperInput
                            containerStyle={{
                                height:50,
                                width:125,
                                backgroundColor:COLORS.white
                            }}
                            value={item.quantity}
                            onMinus={() => {
                                if( item.quantity > 1 ){
                                    item.quantity-1
                                }
                            }}
                            onAdd={() => item.quantity+1}
                        /> */}
                        <View
                            style={{
                                flex:1,
                                marginLeft:10,
                                alignItems:"flex-end",
                                // justifyContent:"flex-end"
                            }}
                        >
                            <Text
                                style={{color:COLORS.primary,...FONTS.h2}}
                            >
                                {/* {constants.currency} {item.cartItem.price} */}
                                {constants.currency} { utils.thousandSeparator(item?.cartItem?.price)}
                            </Text>

                        </View>

                    </View>
                )}}
                renderHiddenItem={ (data, rowMap) => (
                    <IconButton
                        containerStyle={{
                            flex:1,
                            justifyContent:'flex-end',
                            backgroundColor:COLORS.primary,
                            ...styles.cartItemContainer
                        }}
                        icon={icons.delete_icon}
                        iconStyle={{
                            marginRight:0
                        }}
                        onPress={() => {
                            dispatch( deleteCartItemAction( data.item.cartId ) )
                            if( selectedCartItems.length ) {

                                setCartList(cartList.filter( item => item.cartId !== data.item.cartId))
                            }
                            else setCartList([])
                        }}
                    />
                )}
                // leftOpenValue={75}
                // rightOpenValue={-75}
            />            
        )
    }
    const renderNoCartList = () => {
        return (
            <View
                style={{
                    flex:1,
                    justifyContent:"flex-start",
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    paddingHorizontal:SIZES.padding
                }}
            >
                <Image
                    source={icons.oops}
                    resizeMode='contain'
                    style={{
                        width:'60%',
                        height:'60%',
                        tintColor:COLORS.gray3
                    }}
                />
                <Text style={{color:COLORS.gray3,...FONTS.body3}}>You have no property added to the cart. Want to add one?</Text>
                

                <TextButton
                    label="Add a property"
                    buttonContainerStyle={{
                        marginTop:SIZES.padding,
                        height:55,
                        width:"100%",
                        borderRadius:SIZES.radius
                    }}
                    onPress={() => navigation.goBack()}
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
                title='Cart'
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
                        onPress={() => navigation.goBack()}
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
                    // <TopProfileButton navigation={navigation} />
                    <View style={{width:25}}/>
                }
            />

            {/* Cart List */}
            { cartList.length > 0 
                ?
                renderCartList()
                :
                renderNoCartList()
            }

            {/* Footer */}
            <FooterTotal
                subTotal={prices.reduce((accumulator, current) => sumOfPrices(accumulator,current), 0)}
                total={prices.reduce((accumulator, current) => sumOfPrices(accumulator,current)*(1+constants.fees), 0)}
                fee={constants.fees}
                onPress={() => {
                    navigation.navigate("MyCards")
                }}
            />

        </Animated.View>
    )
}

export default Cart

const styles = StyleSheet.create({
    cartItemContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:SIZES.radius,
        paddingHorizontal:SIZES.padding,
        borderRadius:SIZES.radius
    }
});