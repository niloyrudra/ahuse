import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import TopProfileButton from '../../components/TopProfileButton';
import Header from '../../components/Header';
import IconButton from '../../components/IconButton';
import StepperInput from '../../components/StepperInput';
import FooterTotal from '../../components/FooterTotal';
import CardItem from '../../components/CardItem';
import TextButton from '../../components/TextButton';
import FormInput from '../../components/FormInput';

// Constants
import { FONTS,COLORS,SIZES } from '../../constants/theme';
import icons from '../../constants/icons';
import images from '../../constants/images';

import utils from '../../utils/Utils'
import FormInputCheck from '../../components/FormInputCheck';
import RadioButton from '../../components/RadioButton';

const AddNewCard = ({ navigation, route }) => {

    const [selectedCard, setSelectedCard] = React.useState(null)
    const [cardNumber, setCardNumber] = React.useState("")
    const [cardNumberError, setCardNumberError] = React.useState("")
    const [cardName, setCardName] = React.useState("")
    const [cardNameError, setCardNameError] = React.useState("")
    const [expiryDate, setExpiryDate] = React.useState("")
    const [expiryDateError, setExpiryDateError] = React.useState("")
    const [cvvNumber, setCvvNumber] = React.useState("")
    const [cvvNumberError, setCvvNumberError] = React.useState("")
    const [isRemember, setIsRemember] = React.useState(false)

    React.useEffect(() => {
        if(route?.params) {
            let { selectedCard } = route.params
            if( selectedCard ) setSelectedCard(selectedCard)
        }
    }, [])

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

    // Helper
    const isEnableAddCard = () => {
        return cardName !== '' && cardNumber !== '' && expiryDate !== '' && cvvNumber !== '' && cardNameError == '' && cardNumberError == '' && expiryDateError == '' && cvvNumberError == ''
    }

    // Render Sections
    const renderCard = () => {
        return (
            <ImageBackground
                source={images.card}
                style={{
                    height:200,
                    width: '100%',
                    marginTop:SIZES.radius,
                    borderRadius:SIZES.radius,
                    overflow:'hidden'
                }}
            >
                {/* Logo */}
                <Image
                    source={selectedCard?.icon}
                    resizeMode='contain'
                    style={{
                        position:'absolute',
                        top:20,
                        right:20,
                        height:40,
                        width:80
                    }}
                />

                {/* Details */}
                <View
                    style={{
                        flexGrow:1,
                        position:'absolute',
                        bottom:10,
                        left:0,
                        right:0,
                        paddingHorizontal:SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            color:COLORS.white,
                            ...FONTS.h3
                        }}
                    >
                        {cardName}
                    </Text>

                    <View
                        style={{
                            flexDirection:'row'
                        }}
                    >
                        <Text
                            style={{
                                flex:1,
                                color:COLORS.white,
                                ...FONTS.body3
                            }}
                        >
                            {cardNumber}
                        </Text>

                        <Text
                            style={{
                                color:COLORS.white,
                                ...FONTS.body3
                            }}
                        >
                            {expiryDate}
                        </Text>

                    </View>

                </View>

            </ImageBackground>
        )
    }

    const renderForm = () => {
        return (
            <View
                style={{
                    marginTop:SIZES.padding * 2
                }}
            >
                {/* Card Number */}
                <FormInput
                    label="Card Number"
                    keyboardType='number-pad'
                    maxLength={19}
                    value={cardNumber}
                    onChange={value => {
                        let modifiedValue = value?.replace( /\s/g, '' )
                        setCardNumber( modifiedValue?.replace( /(\d{4})/g, '$1 ' ).trim() )
                        utils.validateInput( modifiedValue, 16, setCardNumberError )
                    }}
                    errorMsg={cardNameError}
                    appendComponent={<FormInputCheck
                        value={cardNumber}
                        error={cardNumberError}
                    />}
                />

                {/* Card Holder Name */}
                <FormInput
                    label="Card Holder Name"
                    // keyboardType='number-pad'
                    // maxLength={19}
                    containerStyle={{
                        marginTop:SIZES.radius
                    }}
                    value={cardName}
                    onChange={value => {
                        setCardName( value.trim() )
                        utils.validateInput( value, 1, setCardNameError )
                    }}
                    errorMsg={cardNameError}
                    appendComponent={<FormInputCheck
                        value={cardName}
                        error={cardNameError}
                    />}
                />

                {/* Expiry Date & CVV */}
                <View
                    Style={{
                        // flex:1,
                        flexDirection:"row",
                        marginTop:SIZES.radius
                    }}
                >
                    {/* Expiry Date */}
                    <FormInput
                        label="Expiry Date"
                        // keyboardType='number-pad'
                        placeholder="MM/YY"
                        maxLength={5}
                        containerStyle={{
                            flex:1
                        }}
                        value={expiryDate}
                        onChange={value => {
                            setExpiryDate( value.trim() )
                            utils.validateInput( value, 5, setExpiryDateError )
                        }}
                        errorMsg={expiryDateError}
                        appendComponent={<FormInputCheck
                            value={expiryDate}
                            error={expiryDateError}
                        />}
                    />

                    {/* CVV Input */}
                    <FormInput
                        label="CVV"
                        // keyboardType='number-pad'
                        maxLength={3}
                        containerStyle={{
                            flex:1,
                            marginLeft:SIZES.raius
                        }}
                        value={cvvNumber}
                        onChange={value => {
                            setCvvNumber( value.trim() )
                            utils.validateInput( value, 3, setCvvNumberError )
                        }}
                        errorMsg={cvvNumberError}
                        appendComponent={<FormInputCheck
                            value={cvvNumber}
                            error={cvvNumberError}
                        />}
                    />

                </View>
                
                {/* Radio Button */}
                <View
                    style={{
                        alignItems:"flex-start",
                        marginTop: SIZES.padding
                    }}
                >

                    <RadioButton
                        label="Remember my card detail"
                        // containerStyle={{}}
                        // labelStyle={{}}
                        // iconStyle={{}}
                        onPress={() => setIsRemember(!isRemember)}
                    />
                </View>

            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    paddingTop:SIZES.radius,
                    paddingBottom:SIZES.padding,
                    paddingHorizontal:SIZES.padding
                }}
            >
                <TextButton
                    label="Add Card"
                    disabled={!isEnableAddCard()}
                    buttonContainerStyle={{
                        height:60,
                        borderRadius:SIZES.radius,
                        backgroundColor: isEnableAddCard() ? COLORS.primary : COLORS.transparentPrimray
                    }}
                    onPress={() => navigation.navigate("MyCards")}
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
                title='Add New Card'
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
                        // onPress={() => navigation.goBack(null)}
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
                    <View style={{width:25}} />
                }
            />

            {/* Body */}
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    flexGrow:1,
                    paddingHorizontal:SIZES.padding,
                    paddingBottom:SIZES.padding,
                }}
            >

                {/* Card */}
                {renderCard()}

                {/* Form */}
                {renderForm()}

            </KeyboardAwareScrollView>

            {/* Footer */}
            {renderFooter()}

        </Animated.View>
    )
}

export default AddNewCard

const styles = StyleSheet.create({})
