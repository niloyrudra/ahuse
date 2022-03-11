import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Utils
import utils from '../../utils/Utils'
import AuthLayout from './AuthLayout';

import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction } from '../../store/user/userActions';

// Form Field
import FormInput from '../../components/FormInput';

import { COLORS, FONTS, SIZES } from '../../constants/theme';
import icons from '../../constants/icons';

import SkipTextButton from '../../components/SkipTextButton';
import CustomSwitch from '../../components/CustomSwitch';
import TextButton from '../../components/TextButton'
import TextIconButton from '../../components/TextIconButton';

const SignIn = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const [ username, setUsername ] = React.useState('')
    const [ password, setPassword ] = React.useState('')
    const [ saveMe, setSaveMe ] = React.useState(false)

    const [ usernameError, setUsernameError ] = React.useState('')
    const [ passwordError, setPasswordError ] = React.useState('')

    const [ showPassword, setShowPassword ] = React.useState(false)
    const [ isLoading, setIsLoading ] = React.useState(false)

    // Handlers
    const isEnableSignIn = () => {
        return username !== "" && password !== '' && usernameError == '' && passwordError == ""
    }

    // Handler
    const signInHandler = () => {
        setIsLoading(true)
        const userData = {
            username: username.toLowerCase().trim(),
            password,
            saveMe
        };
        dispatch( userSignInAction( userData, setIsLoading ) )
        setUsername('')
        setPassword('')
        setUsernameError('')
        setPasswordError('')
    };

    const selectLoggedInUser = useSelector( (state) => state.userReducer.token )

    React.useEffect(() => {

        setIsLoading(false)
        setUsername('')
        setPassword('')
        setUsernameError('')
        setPasswordError('')

        if(selectLoggedInUser)
        {
            navigation.navigate("Home")  
        }

        return () => {
            setIsLoading(false)
            setUsername('')
            setPassword('')
            setUsernameError('')
            setPasswordError('')
        }
    }, [selectLoggedInUser])

    React.useEffect(() => {
        let mounted = true;
            (async () => {
                try{
                    const token = await AsyncStorage.getItem('token')
                    const userId = await AsyncStorage.getItem('userId')
                    if(token && userId){
                        if( mounted ) navigation.navigate("Home")
                    }
                }
                catch(err){
                    setIsLoading(false)
                }
            })()
        
        return () => {
            mounted = false
        }
    }, [])

    return (
        <AuthLayout
            title="Let's Sign you in"
            subtitle="Welcome back, you have been missed"
        >
            <SkipTextButton onPress={() => navigation.navigate("Home") } />

            <View
                style={{
                    flex:1,
                    marginTop: SIZES.padding * 2
                }}
            >

                <FormInput
                    label="Username"
                    keyboardType='default'
                    autoCapitalize='none'
                    onChange={(value) => {
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

                    <View
                        style={{
                            flexDirection:"row",
                            marginTop:SIZES.radius,
                            justifyContent:"space-between"
                        }}
                    >
                        <CustomSwitch
                            value={saveMe}
                            onChange={(value) => setSaveMe(value)}
                        />

                        <TextButton
                            label="Forgot Password"
                            buttonContainerStyle={{
                                backgroundColor:null
                            }}
                            labelStyle={{
                                color:COLORS.gray,
                                ...FONTS.body4
                            }}
                            onPress={() => navigation.navigate("ForgotPassword")}
                        />

                    </View>

                <TextButton
                    label={isLoading ? "Processing..." : "Sign In"}
                    disabled={!isEnableSignIn() || isLoading}
                    buttonContainerStyle={{
                        height:55,
                        alignItems:"center",
                        marginTop:SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: !isEnableSignIn() ? COLORS.transparentPrimray : COLORS.primary
                    }}
                    onPress={signInHandler}
                />

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
                        Don't have an account?
                    </Text>

                    <TextButton
                        label="Sign Up"
                        buttonContainerStyle={{
                            marginLeft:SIZES.base,
                            backgroundColor:null
                        }}
                        labelStyle={{
                            color:COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.navigate("SignUp")}
                    />

                </View>

                <View
                    style={{
                        flex:1,
                        justifyContent:"flex-end"
                    }}
                >

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

export default SignIn;