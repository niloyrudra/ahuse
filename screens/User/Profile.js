import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
// import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { getAllProperties } from '../../store/property/propertyActions';

import { COLORS ,FONTS ,SIZES } from '../../constants/theme';
import images from '../../constants/images';
import icons from '../../constants/icons';

import LineDivider from '../../components/LineDivider';
import HorizontalCard from '../../components/HorizontalCard';
import HeaderWithItemNum from '../../components/HeaderWithItemNum';
import TextButton from '../../components/TextButton';

const Profile = ({navigation, selectedProperties, setAllProperties, onSwitch}) => {

    const [ email, setEmail ] = React.useState('')
    const [ username, setUsername ] = React.useState('')
    const [ displayName, setDisplayName ] = React.useState('')
    const [ ownedProperties, setOwnedProperties ] = React.useState([])

    React.useEffect(() => {
        (async () => {
            try{
                const email = await AsyncStorage.getItem("email")
                const name = await AsyncStorage.getItem("username")
                const displayName = await AsyncStorage.getItem("displayName")
                if(displayName) setDisplayName(displayName)
                if(name) setUsername(name)
                if(email) setEmail(email)
            }
            catch(err){
                console.log("Profile data Async Error", err)
                setUsername('')
                setDisplayName('')
                setEmail('')
            }
        })()
    }, [])

    React.useEffect(() => {
        if(selectedProperties && email !== '')
        {
            // console.log(selectedProperties[0])
            const properties = selectedProperties.filter( item => item.creator_email == email )
            setOwnedProperties( properties )
        }
        return () => {
            setOwnedProperties([])
        }
    }, [selectedProperties])

    return (
        <View>
            <FlatList
                data={ownedProperties}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View
                        style={{
                            flex:1,
                            // height:220,
                            alignItems:"center",
                            justifyContent:"center",
                            paddingHorizontal:SIZES.padding,
                            marginTop:SIZES.padding * 2,
                        }}
                    >
                        <Image
                            source={images.profile}
                            resizeMode='contain'
                            style={{
                                width:220,
                                height:220,
                                borderRadius: 220
                            }}
                        />
                        {
                            username !== '' &&
                            (
                                <Text style={{color:COLORS.darkGray,...FONTS.h1,marginTop:SIZES.padding}}>Hello! {username}</Text>
                            )
                        }
                        {/* {
                            username && displayName == '' && <Text style={{color:COLORS.darkGray,...FONTS.h1,marginTop:SIZES.padding}}>Hi! {username}</Text>
                        } */}
                        {/* {
                            displayName && <Text style={{color:COLORS.darkGray,...FONTS.h1,marginTop:SIZES.padding,marginBottom:SIZES.radius}}>Hello! {displayName}</Text>
                        } */}
                        
                        {
                            email !== "" && <Text style={{color:COLORS.gray,...FONTS.h3,marginBottom:SIZES.padding}}>Your registered e-mail - {email}</Text>
                        }

                        <LineDivider/>
                        
                        <HeaderWithItemNum
                            label="Listed Properties"
                            length={ownedProperties.length}
                            containerStyle={{
                                marginTop:SIZES.padding,
                                paddingHorizontal:0
                            }}
                        />


                    {
                        ownedProperties.length == 0 &&
                        <>
                            <View
                                style={{
                                    flex:1,
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}
                            >
                                <Image
                                    source={icons.oops_}
                                    resizeMode='contain'
                                    style={{
                                        width:150,
                                        height:150,
                                        tintColor:COLORS.lightGray1
                                    }}
                                />
                                <Text style={{color:COLORS.darkGray2,...FONTS.body4}}>You have no listed property. Want to add one?</Text>
                            </View>
                            <TextButton
                                label="Add Listing"
                                buttonContainerStyle={{
                                    marginVertical:SIZES.padding,
                                    height:55,
                                    width:"100%",
                                    borderRadius:SIZES.radius,
                                    // paddingHorizontal:SIZES.padding
                                }}
                                onPress={onSwitch}
                            />
                        </>
                    }


                    </View>
                }
                renderItem={( { item, index } ) => (
                    <HorizontalCard
                        containerStyle={{
                            height:130,
                            alignItems:"center",
                            marginHorizontal: SIZES.padding,
                            marginBottom: SIZES.radius
                        }}
                        imageStyle={{
                            // marginTop: 20,
                            margin: 10,
                            height:110,
                            width:110,
                            borderRadius: SIZES.radius
                        }}
                        item={item}
                        onPress={() => navigation.navigate("PropertyDetail", {item:item})}
                    />
                )}
                ListFooterComponent={
                    <View style={{height:220}}/>
                }
            />
        </View>
    )
}

function mapStateToProps( state ) {
    return {
        selectedProperties: state?.propertyReducer?.allProperties,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( Profile )
