import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { COLORS, SIZES } from '../constants/theme'
import icons from '../constants/icons'

import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


const TopProfileButton = ({navigation, route}) => {
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)

    const selectedToken = useSelector( state => state.userReducer.token )

    React.useEffect(() => {
        if(selectedToken) {
            // console.log(selectedToken)
            setIsLoggedIn(true)
        }

        console.log("...", isLoggedIn)

        return () => {
            setIsLoggedIn(false)
        }
    }, [selectedToken])

    React.useEffect(() => {
        console.log("...", isLoggedIn)
        if(!isLoggedIn) {
            // console.log("...||", isLoggedIn)
            (async () => {
                try{
                    const token = await AsyncStorage.getItem('token')
                    if(token){
                        setIsLoggedIn(true)
                    }
                    else{
                        setIsLoggedIn(false)
                    }
                }
                catch(err){
                    console.log("Token Async Error", err)
                    setIsLoggedIn(false)
                }
                console.log("...||...", isLoggedIn)
            })()
        }
        console.log(">>>>>",isLoggedIn)
    }, [])




    return (
        <TouchableOpacity
            style={{
                borderRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center"
            }}
            onPress={() => isLoggedIn ? console.log("profile") : navigation.navigate("SignIn")}
        >
            <Image
                // source={ isLoggedIn ? images.profile : icons.login}
                source={ isLoggedIn ? icons.userRound : icons.login}
                style={{
                    height: 32,
                    width: 32,
                    tintColor:COLORS.gray,
                    // height: 40,
                    // width: 40,
                    // borderRadius: SIZES.radius
                }}
            />
        </TouchableOpacity>
    )
}

export default TopProfileButton
