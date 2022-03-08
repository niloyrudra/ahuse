import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

// Utils
import AuthLayout from './AuthLayout';

import { COLORS, FONTS, SIZES } from '../../constants/theme';
import icons from '../../constants/icons';

// import OTPInputView from '@twotalltotems/react-native-otp-input'

const Otp = ({ navigation, route }) => {

    const [userEmail, setUserEmail] = React.useState('')

    React.useEffect(() => {
        if(route.params.email) setUserEmail(route.params.email)
    }, [route.params])

    return (
        <AuthLayout
            title="OTP Authentication"
            subtitle={`An authentication code has been sent to your email. ${userEmail && userEmail}`}
        >

            <View
                style={{
                    flex:1,
                    marginTop: SIZES.padding * 2
                }}
            >
                {/* OTP Input section */}
                <View
                    style={{
                        flex:1,
                        marginTop:SIZES.padding * 2
                    }}
                >
                    {/* <OTPInputView
                        style={{width: '100%', height: 50}}
                        pinCount={4}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled = {(code) => {
                            console.log(`Code is ${code}, you are good to go!`)
                        }}
                    /> */}

                </View>

                {/* Footer */}
                
            </View>


        </AuthLayout>
    )
}

export default Otp;

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
  
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
  
    underlineStyleBase: {
      width: 65,
      height: 65,
    //   borderWidth: 0,
    //   borderBottomWidth: 1,
      borderRadius:SIZES.radius,
      backgroundColor:COLORS.lightGray2,
      color:COLORS.black,
      ...FONTS.h3
    },
  
    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
    },
  });