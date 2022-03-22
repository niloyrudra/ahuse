import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

// Components
import AuthLayout from './AuthLayout';
import FormInput from '../../components/FormInput';
import TextButton from '../../components/TextButton';

// Redux
import { useDispatch } from 'react-redux';
import { sentResetPasswordRequest } from '../../store/user/userActions';

// Constants
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import icons from '../../constants/icons';
// Utilities
import utils from '../../utils/Utils';

const ForgotPassword = ({ navigation, route }) => {

    const [ email, setEmail ] = React.useState('');
    const [ emailError, setEmailError ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ responseMsg, setResponseMsg ] = React.useState('');

    const dispatch = useDispatch()

    // Handlers
    const isEnableSignIn = () => {
        return ( email !== "" && emailError == '' ) ? ( isLoading ? false : true ) : isLoading;
    }

    const resetPasswordHandler = (e) => {
        setIsLoading(true)
        setResponseMsg('')
        setEmailError('')
        dispatch( sentResetPasswordRequest(email, setResponseMsg, setIsLoading) )
        setEmail('')
    }

    return (
        <AuthLayout
            title="Let's Reset Your Password"
            subtitle="Give your registered e-mail address or username below to reset your password."
        >
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position:"absolute",
                    flexDirection:"row",
                    top:SIZES.padding,
                    right:SIZES.padding,
                    backgroundColor:null
                }}
            >

                <TouchableOpacity
                    style={{
                        marginRight:SIZES.radius
                    }}
                    onPress={() => navigation.navigate("Drawer") }
                >
                    <Image
                        source={icons.home}
                        style={{
                            width:25,
                            height:25,
                            tintColor:COLORS.darkGray
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn") }
                >
                    <Image
                        source={icons.login}
                        style={{
                            width:25,
                            height:25,
                            tintColor:COLORS.darkGray
                        }}
                    />
                </TouchableOpacity>

            </View>


            <View
                style={{
                    flex:1,
                    marginTop: SIZES.padding * 2
                }}
            >

                <FormInput
                    label="Email or Username"
                    keyboardType='email-address'
                    autoCompleteType='email'
                    onChange={(value) => {
                        utils.validateEmail(value, setEmailError)

                        setEmail(value)
                    }}
                    errorMsg={emailError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent:"center"
                            }}
                        >
                            <Image
                                source={ email == '' || ( email !== "" && emailError == "" ) ? icons.correct : icons.cancel }
                                style={{
                                    height:20,
                                    width:20,
                                    tintColor: email == '' ? COLORS.gray : ( email !== "" && emailError == "" ) ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
                />

                <TextButton
                    label={isLoading ? "Processing..." : "Reset Password"}
                    disabled={!isEnableSignIn()}
                    buttonContainerStyle={{
                        height:55,
                        alignItems:"center",
                        marginTop:SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: (!isEnableSignIn()) ? COLORS.transparentPrimray : COLORS.primary
                    }}

                    onPress={resetPasswordHandler}
                />

                {
                    responseMsg !== '' &&
                    <View
                        style={{
                            position:"relative"
                        }}
                    >
                        <Text style={{...FONTS.body3,color:COLORS.orange,marginTop:SIZES.padding,textAlign:"center"}}>{responseMsg}</Text>
            
                    </View>
                }

                
            </View>

        </AuthLayout>
    )
}

export default ForgotPassword;