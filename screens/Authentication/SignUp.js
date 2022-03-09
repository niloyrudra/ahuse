import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

// Utils
import utils from '../../utils/Utils'
import AuthLayout from './AuthLayout';

// Form Field
import FormInput from '../../components/FormInput';
// Constants
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import icons from '../../constants/icons';
// Components
import SkipTextButton from '../../components/SkipTextButton';
import TextButton from '../../components/TextButton'
import TextIconButton from '../../components/TextIconButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../../store/user/userActions';

const SignUp = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const [ username, setUsername ] = React.useState('')
    const [ email, setEmail ] = React.useState('')
    const [ password, setPassword ] = React.useState('')

    const [ usernameError, setUsernameError ] = React.useState('')
    const [ emailError, setEmailError ] = React.useState('')
    const [ passwordError, setPasswordError ] = React.useState('')

    const [ showPassword, setShowPassword ] = React.useState(false)
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ hasToken, setHasToken ] = React.useState(false)
    const [ requestStatus, setRequestStatus ] = React.useState()
    const [ token, setToken ] = React.useState('')

    const isEnableSignIn = () => {
        return username !== "" && email !== "" && password !== '' && usernameError == '' && emailError == '' && passwordError == ""
    }

    const tempToken = useSelector( (state) => state.userReducer.tempToken )
    const selectLoggedInUser = useSelector( (state) => state.userReducer.token )
    const selectIsLoading = useSelector( (state) => state.userReducer.isLoading )

    React.useEffect(() => {
        if(selectLoggedInUser)
        {
            setIsLoading(true)
            setHasToken(true)
            // navigation.replace("MainLayout")
            navigation.replace("Home")
        }
    }, [selectLoggedInUser])

    React.useEffect(() => {
        if(tempToken){
            setToken(tempToken)
            console.log(tempToken)
        }
    }, [tempToken])

    React.useEffect(() => {
        if(requestStatus){
            navigation.replace("SignIn")
        }
    }, [requestStatus])

    React.useEffect(() => {
        // if(selectIsLoading){
            setIsLoading(selectIsLoading)
        // }
    }, [selectIsLoading])

    // Handler
    const signUpHandler = () => {
        setIsLoading(true)
        const userData = {
            username: username.toLowerCase().trim(),
            email: email.trim(),
            password: password,
            tempToken: tempToken
        };
        console.log("SIGN_UP", userData)
        dispatch( userSignUpAction( userData, setIsLoading, setRequestStatus ) )
    };

    return (
        <AuthLayout
            title="Let's Sign you up"
            subtitle="Create an account to continue."
        >
            {/* Skip To Home Screen */}
            <SkipTextButton onPress={() => navigation.navigate("Home") } />

            <View
                style={{
                    flex:1,
                    marginTop: SIZES.padding * 2
                }}
            >

                {/* Form Input Section */}
                {/* Username */}
                <FormInput
                    label="Username"
                    keyboardType='default'
                    // autoCompleteType='email'
                    onChange={(value) => {
                        // Validate Username
                        utils.validateUsername(value, setUsernameError)
                        if(value.indexOf(' ') >= 0){
                            setUsernameError("No white spaces please, use '_' instead!")
                        }

                        setUsername(value)
                    }}
                    errorMsg={usernameError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent:"center"
                            }}
                        >
                            <Image
                                source={ username == '' || ( username !== "" && usernameError == "" ) ? icons.correct : icons.cancel }
                                style={{
                                    height:20,
                                    width:20,
                                    tintColor: username == '' ? COLORS.gray : ( username !== "" && usernameError == "" ) ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
                />
                {/* Email */}
                <FormInput
                    label="Email"
                    keyboardType='email-address'
                    autoCompleteType='email'
                    onChange={(value) => {
                        // Validate Email
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
                {/* Password */}
                <FormInput
                    label="Password"
                    autoCompleteType='password'
                    secureTextEntry={!showPassword}
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => {
                        // Validate Password
                        utils.validatePassword(value, setPasswordError)

                        setPassword(value)
                    }}
                    errorMsg={passwordError}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width:40,
                                alignItems:"flex-end",
                                justifyContent:"center",
                            }}
                            onPress={() => setShowPassword(!showPassword) }
                        >
                            <Image
                                source={showPassword ? icons.eye_close : icons.eye}
                                style={{
                                    height:20,
                                    width:20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    }
                />

                {/* Sign up section */}
                <TextButton
                    label={isLoading ? "Processing..." : "Sign Up"}
                    disabled={!isEnableSignIn()}
                    buttonContainerStyle={{
                        height:55,
                        alignItems:"center",
                        marginTop:SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: !isEnableSignIn() ? COLORS.transparentPrimray : COLORS.primary
                    }}
                    // onPress={() => navigation.navigate("Otp", { email: email })}
                    onPress={signUpHandler}
                />

                {/* Sign Up section */}
                <View
                    style={{
                        flexDirection:"row",
                        marginTop:SIZES.radius,
                        justifyContent:"center"
                    }}
                >
                    <Text
                        style={{
                            color:COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Already have an account?
                    </Text>

                    <TextButton
                        label="Sign In"
                        buttonContainerStyle={{
                            marginLeft:SIZES.base,
                            backgroundColor:null
                        }}
                        labelStyle={{
                            color:COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.goBack()}
                    />

                </View>

                {/* Footer */}
                <View
                    style={{
                        flex:1,
                        justifyContent:"flex-end"
                    }}
                >
                    {/* FaceBook */}
                    <TextIconButton
                        label="Continue With Facebook"
                        icon={icons.fb}
                        iconPosition="left"
                        containerStyle={{
                            height: 50,
                            alignItems:"center",
                            borderRadius:SIZES.radius,
                            backgroundColor: COLORS.blue
                        }}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        labelStyle={{
                            marginLeft: SIZES.radius,
                            color:COLORS.white
                        }}
                        onPress={() => console.log("Facebook")}
                    />
                    {/* Google */}
                    <TextIconButton
                        label="Continue With Google"
                        icon={icons.google}
                        iconPosition="left"
                        containerStyle={{
                            height: 50,
                            alignItems:"center",
                            borderRadius:SIZES.radius,
                            marginTop: SIZES.radius,
                            backgroundColor: COLORS.lightGray2
                        }}
                        iconStyle={{
                            tintColor: COLORS.black
                        }}
                        labelStyle={{
                            marginLeft: SIZES.radius,
                            color:COLORS.black
                        }}
                        onPress={() => console.log("Google")}
                    />

                </View>


            </View>


        </AuthLayout>
    )
}

export default SignUp;

