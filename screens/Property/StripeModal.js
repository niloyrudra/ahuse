import React from 'react'
import { Text, TextInput, View, StyleSheet, Animated, TouchableWithoutFeedback, Modal, Alert } from 'react-native'

// Constants
import constants from '../../constants/constants';
import icons from '../../constants/icons';
import { COLORS ,FONTS ,SIZES } from '../../constants/theme'

// Components
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';

import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';

// const StripeModal = ({isFeaturedAllowedHandler, isVisible, onClose}) => {
const StripeModal = ({ isFeaturedAllowedHandler, setFeaturedValue, isVisible, onClose }) => {

    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current
    // const modalRef = React.useRef( false )
    // console.log( "Ref Status >>", refEl.current.value)

    const [ showStripeModal, setShowStripeModal ] = React.useState(isVisible)
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [amount, setAmount] = React.useState(1);
    const [cardDetails, setCardDetails] = React.useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const stripe = useStripe()

    React.useEffect(() => {
        if(showStripeModal)
        {
            Animated.timing( modelAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            } ).start()
        }else{
            Animated.timing( modelAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            } ).start(() => onClose())
        }
    }, [showStripeModal])

    const modalY = modelAnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [SIZES.height, SIZES.height - 680]
    })

    // Handler
    const handlePayPress = async () => {
        try {
          const finalAmount = parseInt(amount);
          if (finalAmount < 1) return Alert.alert("You cannot pay below 1 EUR");
          const response = await fetch(`${constants.API_URL}/create-payment-intent?amount=${amount}&name=${name}&email=${email}`, {
            method: "POST",
            headers: {
              "Accept": 'application/json, text/plain, */*',
              "Content-Type": "application/json",
            }
            // body: JSON.stringify({ amount: finalAmount, name, email }),
          });

          const data = await response.json();

        //   if (data.message) {
        //     Alert.alert(data.message);
        //   }
          if (data.clientSecret) {
                const initSheet = await stripe.initPaymentSheet({
                    paymentIntentClientSecret: data.clientSecret,
                    googlePay: true,
                    merchantDisplayName: 'Ahuse',
                });
                if (initSheet.error) {
                    console.error(initSheet.error);
                    return Alert.alert(initSheet.error.message);
                }
                const presentSheet = await stripe.presentPaymentSheet({
                    clientSecret: data.clientSecret,
                });
                if (presentSheet.error) {
                    console.error(presentSheet.error);
                    return Alert.alert(presentSheet.error.message);
                }

                isFeaturedAllowedHandler(true)
                
                Alert.alert(
                    "Payment successful!",
                    "Thank you.",
                    [
                        {
                            text: "Great",
                            onPress: () => {
                                isFeaturedAllowedHandler(true);
                                setFeaturedValue( 'featured', true);
                            }
                        }
                    ]
                );
                
                // Close the Modal
                setShowStripeModal(false)
                
                // setFeaturedValue( 'featured', true)
            }
          
        } catch (err) {
          console.error(err);
          Alert.alert(["Sorry", "Payment failed!"]);
        }
    };

    return (
        <Modal
            // ref={refEle}
            animationType='fade'
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    flex:1,
                    backgroundColor: COLORS.transparentBlack7
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        // isFeaturedAllowedHandler(false)
                        // refEl.current.value = false
                        setFeaturedValue( 'featured', false)
                        setShowStripeModal(false)
                    }}
                >
                    <View
                        style={{
                            position:"absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }}
                    />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        position:"absolute",
                        left:0,
                        top:modalY,
                        width:"100%",
                        height:"100%",
                        padding: SIZES.padding,
                        borderTopLeftRadius: SIZES.padding,
                        borderTopRightRadius: SIZES.padding,
                        backgroundColor:COLORS.white
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >
                        <Text
                            style={{flex:1,...FONTS.h3, fontSize:18}}
                        >Make a payment to feature</Text>

                        <IconButton
                            containerStyle={{
                                borderWidth:2,
                                borderRadius: 10,
                                borderColor: COLORS.gray2
                            }}
                            icon={icons.cross}
                            iconStyle={{
                                tintColor: COLORS.gray2
                            }}
                            onPress={() => {
                                // refEl.current.value = false
                                setFeaturedValue( 'featured', false)
                                setShowStripeModal(false)
                                
                            }}
                        />                        
                    </View>

                    {/* Stripe form fields */}
                    <View>
                        {/* Name */}
                        <TextInput
                            autoComplete='none'
                            placeholder='Name'
                            // keyboardType='email-address'
                            underlineColorAndroid="transparent"
                            multiline={false}
                            numberOfLines={1}
                            onChange={value => setName(value.nativeEvent.text.trim())}
                            style={styles.input}
                        />
                        {/* Email */}
                        <TextInput
                            autoComplete='none'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            underlineColorAndroid="transparent"
                            multiline={false}
                            numberOfLines={1}
                            onChange={value => setEmail(value.nativeEvent.text.trim())}
                            style={styles.input}
                        />

                        {/* Card Field */}
                        {/* <CardField
                            postalCodeEnabled={true}
                            placeholder={{
                                number: "4242 4242 4242 4242"
                            }}
                            cardStyle={styles.card}
                            style={styles.cardContainer}
                            onCardChange={
                                cardDetails => setCardDetails( cardDetails )
                            }
                        /> */}


                    </View>

                    <View
                        style={{
                            flex:1,
                            position: "absolute",
                            bottom: 120,
                            left:0,
                            right:0,
                            height:110,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.radius,
                            backgroundColor: COLORS.white,
                            borderTopWidth: 2,
                            borderTopColor:COLORS.lightGray2
                        }}
                    >
                        <TextButton
                            label="Proceed"
                            disabled={loading}
                            buttonContainerStyle={{
                                height:50,
                                borderRadius:SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={handlePayPress}
                        />

                    </View>

                </Animated.View>

            </View>
            
        </Modal>
  )
}

export default StripeModal

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.lightGray,
        borderRadius:SIZES.radius,
        borderColor: 'transparent',
        height: 40,
        padding: 10,
        borderRadius: 4,
        marginTop: 15,
        ...FONTS.body3
    },
    card: {
        backgroundColor: COLORS.lightGray,
        // borderRadius:SIZES.radius,
        // borderColor: 'transparent',
        // height: 40,
        // padding: 10,
        // borderRadius: 4,
        // marginTop: 15,
        // ...FONTS.body3
    },
    cardContainer: {
        height: 50,
        marginVertical: 30
    },
    label: {
        color: COLORS.gray,
        marginTop: SIZES.padding
    },
    errorMessage:{
        color:'red',
        marginTop:4,
        letterSpacing:0.5,
        ...FONTS.body5
    },
});