import React from 'react'
import { Text, TextInput, View, StyleSheet, Animated, TouchableWithoutFeedback, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native'

// Constants
import constants from '../../constants/constants';
import icons from '../../constants/icons';
import { COLORS ,FONTS ,SIZES } from '../../constants/theme'

// Components
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';

import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';

const StripeModal = ({refEle, isVisible, onClose}) => {

    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current
    // const modalRef = React.useRef( false )

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
    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${constants.API_URL}/create-payment-intent?amount=${amount}&name=${name}&email=${email}`, {
          method: "POST",
          headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ amount, name, email })
        });
        // const { clientSecret, error } = await response.json();
        const { clientSecret } = await response.json();
        // const res = await response.text();

        return { clientSecret };
    };

    const handlePayPress = async () => {
        console.log("Triggered Pay Button")
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

          if (data.message) {
            Alert.alert(data.message);
          }
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
                Alert.alert("Pay successfully! Thank you.");

                // Close the Modal
                setShowStripeModal(false)
            }
          
        } catch (err) {
          console.error(err);
          Alert.alert(["Sorry", "Payment failed!"]);
        }
      };

    //   const handlePayPress = async () => {
    //     //1.Gather the customer's billing information (e.g., email)
    //     if (!cardDetails?.complete || !email || !name) {
    //       Alert.alert("Please enter Complete card details");
    //       return;
    //     }
    //     const billingDetails = {
    //       name: name,
    //       email: email,
    //     };
    //     //2.Fetch the intent client secret from the backend
    //     try {
    //         console.log("start sending request....")
    //         const { clientSecret } = await fetchPaymentIntentClientSecret();
    //         console.log("getting resolve....")

    //       console.log(clientSecret);

    //       //2. confirm the payment
    //     //   if (error) {
    //       if (!clientSecret) {
    //         console.log("Unable to process payment");
    //       } else {
    //         const { paymentIntent, error } = await confirmPayment(clientSecret, {
    //           type: "Card",
    //           billingDetails: billingDetails,
    //         });
    //         if (error) {
    //           alert(`Payment Confirmation Error ${error.message}`);
    //         } else if (paymentIntent) {
    //           alert("Payment Successful");
    //           console.log("Payment successful ", paymentIntent);
    //         }
    //       }
    //     } catch (e) {
    //       console.log("Request Failing....", e);
    //     }
    //     //3.Confirm the payment with the card details
    //   };

  return (
        <Modal
            // ref={modalRef}
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
                    onPress={() => setShowStripeModal(false)}
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
                                refEle.current=false
                                setShowStripeModal(false)
                                // console.log(modalRef.current)
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