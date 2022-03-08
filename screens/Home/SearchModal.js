import React from 'react'
import { Text, View, Animated, TouchableWithoutFeedback, Modal, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import FilterSection from '../../components/FilterSection';


// Component
import IconButton from '../../components/IconButton';
import LineDivider from '../../components/LineDivider';
// Constants
import constants from '../../constants/constants';
import icons from '../../constants/icons';

import { COLORS ,FONTS ,SIZES } from '../../constants/theme'
import TextButton from '../../components/TextButton';
import HorizontalCard from '../../components/HorizontalCard'

const SearchModal = ({ navigation, isVisible, searchResultData, query, onClose }) => {
    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const [ searchResult, setSearchResult ] = React.useState([])
    const [ showSearchModal, setShowSearchModal ] = React.useState(isVisible)
    const [ isLoading, setIsLoading ] = React.useState(true)

    React.useEffect(() => {
        if(showSearchModal)
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
    }, [showSearchModal])

    const modalY = modelAnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [SIZES.height, SIZES.height - 680]
    })

    React.useEffect(() => {
        if(searchResultData) {
            setSearchResult( searchResultData )
            setIsLoading(false)
        }
        return () => {
            setSearchResult( [] )
            setIsLoading(false)
        }
    }, [])

    // Render Sections
    const renderSearchResult = () => {
        return (
            <>
                <FlatList
                    data={searchResult}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={ item => `${item.id}`}
                    renderItem={( { item, index } ) => (
                        <HorizontalCard
                            containerStyle={{
                                height:130,
                                alignItems:"center",
                                // marginHorizontal: SIZES.padding,
                                marginVertical: SIZES.radius
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
                    ) }
                    ListFooterComponent={
                        <View
                            style={{
                                height:200
                            }}
                        />
                    }
                />
            </>
        )
    }

    const renderNoResultMsg = () => {
        return (
            <View
                style={{
                    flex:1,
                    alignItems:"center",
                    justifyContent:"flex-start"
                }}
            >
                <Image
                    source={icons.oops}
                    resizeMode='contain'
                    style={{
                        width:'50%',
                        height:'50%',
                        marginTop: SIZES.padding,
                        tintColor:COLORS.gray2
                    }}
                />
                <Text style={{color:COLORS.gray2,...FONTS.h3}}>No property found. Please try again!</Text>
            </View>
        )
    }

    return (
        <Modal
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
                {/* Transparent Background */}

                <TouchableWithoutFeedback
                    onPress={() => setShowSearchModal(false)}
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

                    {/* Header Section */}
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >
                        <View style={{flex:1}}>
                        {query ?

                            <Text
                                style={{flex:1,...FONTS.h3, fontSize:18}}
                            >Your search result for <Text style={{...FONTS.h3, fontSize:18,color:COLORS.primary}}>"{query}"</Text></Text>
                            
                            :
                            <Text
                                style={{flex:1,...FONTS.h3, fontSize:18}}
                            >Your search result by filter</Text>
                        }
                            <Text
                                style={{flex:1,...FONTS.h5,color:COLORS.gray}}
                            >Number of properties found - {searchResult.length}</Text>

                        </View>

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
                                setShowSearchModal(false)
                            }}
                        />

                        
                    </View>

                    {/* Search Result Section */}
                    {searchResult.length ?
                        renderSearchResult()
                        :
                        renderNoResultMsg()
                    }

                    {/* Apply Button */}
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
                            label="Show All"
                            disabled={ searchResult.length ? false: true }
                            buttonContainerStyle={{
                                height:50,
                                borderRadius:SIZES.base,
                                backgroundColor: searchResult.length ? COLORS.primary : COLORS.transparentPrimray
                            }}
                            onPress={() => console.log("Show All Result")}
                        />

                    </View>
                    
                </Animated.View>

            </View>
            
        </Modal>
    )
}

export default SearchModal
