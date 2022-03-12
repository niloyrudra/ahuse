import React from 'react';
import { FlatList, Image, Text, View } from 'react-native'

// import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { getAllProperties } from '../../store/property/propertyActions';

import HorizontalCard from '../../components/HorizontalCard';

import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Favourite = ({navigation, selectedProperties, selectedUserId }) => {

    const [ userId, setUserId ] = React.useState(null)
    const [ favProperties, setFavProperties ] = React.useState([])

    // React.useEffect(() => {
    //     let mounted = true;
    //     (async () => {
    //         try{
    //             const userId = await AsyncStorage.getItem("userId")
    //             if(mounted && userId) setUserId(userId)
    //         }
    //         catch(err){
    //             console.log("Profile data Async Error", err);
    //             setUserId(null);
    //         }
    //     })();
    //     return () => {
    //         mounted = false;
    //         setUserId(null);
    //     }
    // }, [])

    React.useEffect(() => {
        if( selectedUserId ) setUserId( selectedUserId )
        return () => setUserId(null)
    }, [selectedUserId]);


    React.useEffect(() => {
        if(selectedProperties && userId)
        {
            const properties = selectedProperties.filter( item => item.is_fav !== null )
            setFavProperties( properties );
        }
        return () => {
            setFavProperties([])
        }
    }, [selectedProperties]);

    return (
        <>
            {
                favProperties.length
                ?
                <View>

                    <FlatList
                        data={favProperties}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={ item => `${item.id}`}
                        ListHeaderComponent={
                            <Text style={{flex:1,...FONTS.h4,color:COLORS.darkGray,paddingHorizontal: SIZES.padding, paddingTop: SIZES.padding/2}} >Number of favourite properties found - {favProperties.length}</Text>
                        }
                        renderItem={( { item, index } ) => (
                            <HorizontalCard
                                containerStyle={{
                                    height:130,
                                    alignItems:"center",
                                    marginHorizontal: SIZES.padding,
                                    marginVertical: SIZES.radius
                                }}
                                imageStyle={{
                                    marginTop: 20,
                                    margin: 10,
                                    height:110,
                                    width:110,
                                    borderRadius: SIZES.radius
                                }}
                                item={item}
                                onPress={() => navigation.navigate("PropertyDetail", {item:item})}
                            />
                        ) }
                        ListFooterComponent={
                            <View
                                style={{
                                    height:200
                                }}
                            />
                        }
                    />
                </View>
                :
                <View
                    style={{
                        flex:1,
                        alignItems:"center",
                        justifyContent:"flex-start",
                        paddingHorizontal:SIZES.padding
                    }}
                >
                    <Image
                        source={icons.oops}
                        resizeMode='contain'
                        style={{
                            width:'60%',
                            height:'60%',
                            tintColor:COLORS.lightGray1,
                        }}
                    />
                    <Text style={{color:COLORS.gray2,...FONTS.h3}}>No favourite properties found! Please come again later.</Text>
                </View>
            }
        </>


    )
}

function mapStateToProps( state ) {
    return {
        selectedProperties: state?.propertyReducer?.allProperties,
        selectedUserId: state?.userReducer?.userId,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( Favourite )
