import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { getAllProperties } from '../../store/property/propertyActions';

import { COLORS ,FONTS ,SIZES } from '../../constants/theme';
import images from '../../constants/images';
import icons from '../../constants/icons';
import constants from '../../constants/constants';

import LineDivider from '../../components/LineDivider';
import HorizontalCard from '../../components/HorizontalCard';
import HeaderWithItemNum from '../../components/HeaderWithItemNum';
import TextButton from '../../components/TextButton';

const Profile = ({navigation, selectedProperties, selectedUsername, selectedUserId, selectedEmail, selectedDisplayName, onSwitch}) => {

    const [ email, setEmail ] = React.useState('')
    const [ username, setUsername ] = React.useState('')
    const [ userId, setUserId ] = React.useState(null)
    const [ displayName, setDisplayName ] = React.useState('')
    const [ ownedProperties, setOwnedProperties ] = React.useState([])

    React.useEffect( () => {
        console.log(selectedUserId)
        if( selectedUsername ) setUsername( selectedUsername )
        if( selectedUserId ) setUserId( selectedUserId )
        if( selectedEmail ) setEmail( selectedEmail )
        if( selectedDisplayName ) setDisplayName( selectedDisplayName )
        return () => {
            setUsername( '' )
            setUserId( null )
            setDisplayName( '' )
            setEmail( '' )
        }
    }, [selectedUsername, selectedUserId, selectedEmail, selectedDisplayName] )


    React.useEffect(() => {
        console.log( "[profile - properties]" )
        console.log( userId )
        if(selectedProperties && userId)
        {
            const properties = selectedProperties.filter( item => item.publisher_id == userId )
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
                        {
                            email !== '' &&
                            (
                                <View
                                    style={{
                                        flexDirection:"row",
                                        marginVertical:SIZES.radius
                                    }}
                                >
                                    <Image
                                        source={icons.envelope2}
                                        resizeMode="contain"
                                        style={{
                                            width:20,
                                            height:20,
                                            tintColor:COLORS.darkGray,
                                            marginRight:SIZES.radius
                                        }}
                                    />
                                    <Text style={{color:COLORS.darkGray,...FONTS.h3}}>{email}</Text>
                                </View>
                            )
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
        selectedUsername: state?.userReducer?.username,
        selectedUserId: state?.userReducer?.userId,
        selectedEmail: state?.userReducer?.email,
        selectedDisplayName: state?.userReducer?.displayname,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( Profile )