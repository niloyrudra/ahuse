import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ActivityIndicator,
    Switch
} from 'react-native';

// import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { connect } from 'react-redux'
import { getAllCats, getAllTaxData } from '../../store/property/propertyActions';

// Constants
// import constants from '../../constants/constants';
import icons from '../../constants/icons';
import { COLORS ,FONTS ,SIZES } from '../../constants/theme';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import HorizontalCard from '../../components/HorizontalCard';
import PopularSection from '../../components/PopularSection';
import RecommendedSection from '../../components/RecommendedSection';
import UserLocation from '../../components/UserLocation';

// Modal
import FilterModal from './FilterModal';
import SearchModal from './SearchModal';

const Home = ( { navigation, allProperties, setAllCats } ) => {

    let searchQueryTimeout;
    const searchRef = useRef()

    const dispatch = useDispatch()
    React.useEffect(() => dispatch( getAllTaxData() ), []);
    const allTaxData = useSelector( state => state.propertyReducer.allTax )

    const [ searchQuery, setSearchQuery ] = React.useState('')
    const [ searchResultData, setSearchResultData ] = React.useState([])
    const [ recommendedProperty, setRecommendedProperty ] = React.useState([])
    const [ selectedCategoryId, setSelectedCategoryId ] = React.useState()
    const [ propertiesByType, setPropertiesByType ] = React.useState([])
    const [ typeId , setTypeId ] = React.useState([])
    const [ typeTaxonomies, setTypeTaxonomies ] = React.useState([])
    const [ catTaxonomies, setCatTaxonomies ] = React.useState([])
    const [ areaTaxonomies, setAreaTaxonomies ] = React.useState([])
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ isSales, setIsSales ] = React.useState(false)
    const [ isRental, setIsRental ] = React.useState(false)

    // Modals
    const [showFilterModal, setShowFilterModal] = React.useState(false)
    const [showSearchResultModal, setShowSearchResultModal] = React.useState(false)

    React.useEffect(() => {
        setIsLoading(true)
        if(allTaxData) {
            if( allTaxData.action_cat ) setTypeTaxonomies( allTaxData.action_cat.filter( item => item.count > 0 ) )
            if( allTaxData.cat ) {
                setCatTaxonomies( allTaxData.cat.filter( item => item.count > 0 ) )
                setAllCats( allTaxData.cat.filter( item => item.count > 0 ) )
            }
            if( allTaxData.area ) setAreaTaxonomies( allTaxData.area.filter( item => item.count > 0 ) )

            setIsLoading(false)
        }
    }, [allTaxData])

    React.useEffect(() => {
        if( catTaxonomies && catTaxonomies[0]){
            setSelectedCategoryId( catTaxonomies[0].id )
            getPropertiesByCategoryHandler(  catTaxonomies[0].id )
        }
    },[catTaxonomies])

    React.useEffect(() => {
        setRecommendedProperty(allProperties.filter( i => i.recommended == 1 ))
    },[allProperties])

    React.useEffect(() => {
        setTypeId(typeTaxonomies[0]?.id)
        // if(allProperties.length) setPropertiesByType(allProperties.filter( i => i.cad_ids.includes( typeTaxonomies[0]?.id ) ))
        if(allProperties.length) setPropertiesByType(allProperties.filter( i => i.cad_ids == typeTaxonomies[0]?.id ))
    },[typeTaxonomies])

    // Handler
    const getPropertiesByCategoryHandler = ( categoryId ) => {
        // Retrieve the recommended properties
        let selectedProductsByCatID = allProperties.filter( item => item.cat_ids.includes( categoryId ) )
        // Set the featured properties as recommended properties
        setRecommendedProperty( selectedProductsByCatID );
    }

    const getPropertiesByTypeHandler = ( typeId ) => {
        // Retrieve the recommended properties
        let selectedProductsByType = allProperties.filter( item => item.cad_ids.includes( typeId ) )
        // Set the featured properties as recommended properties
        setPropertiesByType( selectedProductsByType );
    }

    const handleChangeTax = ( categoryId, typeId ) => {
        // Set the Selected Cat ID
        setSelectedCategoryId( categoryId )
        // Get Filtered properties by category name
        getPropertiesByCategoryHandler(categoryId)
        if(typeId)
        {
            getPropertiesByTypeHandler( typeId )
        }
        else
        {
            getPropertiesByTypeHandler( typeTaxonomies[0]?.id )
        }

    }

    React.useEffect(() => {if(showSearchResultModal == false) setSearchResultData([])}, [showSearchResultModal])

    // Render Sections
    const renderSearch = () => {
        return (
            <View
                style={{
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        height: 40,
                        alignItems:"center",
                        marginVertical: SIZES.base,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2
                    }}
                >
                    {/* Icon */}
                    <Image
                        source={icons.search}
                        style={{
                            height:20,
                            width:20,
                            tintColor: COLORS.black
                        }}
                    />

                    {/* Text Input */}
                    <TextInput
                        ref={searchRef}
                        style={{
                            flex:1,
                            marginLeft:SIZES.radius,
                            ...FONTS.body3
                        }}
                        // value={searchQuery}
                        placeholder="Search Properties"
                        onChangeText={(value) => {
                            // setSearchQuery(value)
                            clearTimeout(searchQueryTimeout)
                            searchQueryTimeout = setTimeout(() => {
                                let data = []
                                searchRef.current = value
                                if(searchRef.current.length == 0) return
                                if(allProperties)
                                {
                                    // console.log(searchModelRef.current)
                                    const type = isSales ? 'Sales' : (isRental ? 'Rentals': '');
                                    if(type != ''){
                                        data = allProperties.filter( item => item.cad_names.includes( type ) && ( item.address.toLowerCase().includes( value.toLowerCase() ) || item.title.toLowerCase().includes( value.toLowerCase() ) ))
                                    }
                                    else {
                                        data = allProperties.filter( item => item.address.toLowerCase().includes( value.toLowerCase() ) || item.title.toLowerCase().includes( value.toLowerCase() ) )
                                    }
                                    if(data)
                                    {
                                        setSearchResultData(data)
                                    }
                                    setSearchQuery(value)
                                    setShowSearchResultModal(true)
                                }
                            }, 750)

                        }}
                    />

                    {/* Filter Button */}
                    <TouchableOpacity
                        onPress={() => {
                            searchRef.current = ''
                            setSearchQuery('')
                            setShowFilterModal(true)
                        }}
                    >
                        <Image
                            source={icons.filter}
                            style={{
                                height: 20,
                                width:20,
                                tintColor: COLORS.black
                            }}
                        />
                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        // flex:1,
                        flexDirection:"row",
                        justifyContent:'space-between',
                        alignItems:"center",
                        height:40,
                        // borderBottomWidth:1,
                        // borderBottomColor:COLORS.lightGray,
                        paddingBottom:10
                    }}
                >
                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:'flex-start',
                            alignItems:"center",
                        }}
                    >
                        <Switch
                            trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
                            thumbColor={isSales ? COLORS.primary : "#f4f3f4"} // "#81b0ff"
                            onValueChange={ val => {
                                setIsRental(!val)
                                setIsSales(val)
                            }}
                            value={isSales}
                        />
                        <Text style={{color:isSales ? COLORS.primary : COLORS.gray,...FONTS.body3}}>Sales</Text>
                    </View>

                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:'flex-end',
                            alignItems:"center",
                        }}
                    >
                        <Switch
                            trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
                            thumbColor={isRental ? COLORS.primary : "#f4f3f4"} // "#81b0ff"
                            onValueChange={ val => {
                                setIsSales(!val)
                                setIsRental(val)
                            }}
                            value={isRental}
                        />
                        <Text style={{color:isRental ? COLORS.primary : COLORS.gray,...FONTS.body3}}>Rental</Text>
                    </View>
                </View>

            </View>
        )
    }

    const renderLocationSection = () => {
        return (
            <View
                style={{
                    marginTop:SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
            >
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center"
                }}
            >
                <Image
                    source={icons.location}
                    style={{
                        width:20,
                        height:20,
                        marginRight: SIZES.base,
                        tintColor: COLORS.primary
                    }}
                />
                <Text
                    style={{
                        color: COLORS.primary,
                        ...FONTS.body3
                    }}
                >
                    YOUR LOCATION
                </Text>
            </View>

                <UserLocation
                    containerStyle={{
                        flexDirection: 'row',
                        marginTop:SIZES.base,
                        alignItems: "center"
                    }}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                />

                {/* <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop:SIZES.base,
                        alignItems: "center"
                    }}
                    // onPress={() => navigation.navigate( "MapScreen" )}
                >
                    <Text 
                        style={{
                            ...FONTS.h3
                        }}
                    >
                        {myProfile?.address}
                    </Text>

                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width:  20,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity> */}

            </View>
        )
    }

    const renderCatSection = () => {
        return (
            <FlatList
                horizontal
                // data={selectedCats}
                data={catTaxonomies}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={ ( { item, index } ) => (
                    <TouchableOpacity
                        style={{
                            // flexDirection: "row",
                            flex:1,
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            // marginRight: index == selectedCats.length - 1 ? SIZES.padding : 0,
                            marginRight: index == catTaxonomies.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2,
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                        onPress={() => handleChangeTax( item.id, typeId )}
                    >
                        <Text
                            style={{
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS.darkGray,
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    const renderTypes = () => {
        return (
            <FlatList
                horizontal
                data={typeTaxonomies}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={ ( { item, index } ) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == typeTaxonomies.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setTypeId( item.id )
                            handleChangeTax( selectedCategoryId, item.id )
                        }}
                    >
                        <Text
                            style={{
                                color: typeId == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }



    return (

        <View
            style={{
                flex:1
            }}
        >
            {/* Search Section */}
            {renderSearch()}
            
            {/* Filter Section */}
            {/* Modal */}
            {showFilterModal &&
                <FilterModal
                    refEle={searchRef}
                    data={properties}
                    isVisible={showFilterModal}
                    catList={catTaxonomies}
                    typeList={typeTaxonomies}
                    areaList={areaTaxonomies}
                    onClose={() => setShowFilterModal(false)}
                    onGenerateSearchData={(data) => setSearchResultData(data)}
                    onShowSearchModal={() => setShowSearchResultModal(true)}
                />
            }
            {showSearchResultModal &&
                <SearchModal
                    refEle={searchRef}
                    navigation={navigation}
                    isVisible={showSearchResultModal}
                    searchResultData={ searchResultData }
                    // query={ typeof searchRef.current !== 'object' ? searchRef.current : ''}
                    query={searchQuery}
                    onClose={() => setShowSearchResultModal(false)}
                />
            }

            {
                isLoading
                    ?
                    <ActivityIndicator
                        animating={isLoading}
                        size="large"
                        color={COLORS.primary}
                    />
                    :
                    //List
                    <FlatList
                        // data={allProperties}
                        data={propertiesByType}
                        keyExtractor={item => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View>
                                {/* Top Location */}
                                {renderLocationSection()}

                                {/* Categories */}
                                {renderCatSection()}

                                {/* Popular Section */}
                                <PopularSection navigation={navigation} data={recommendedProperty} catId={selectedCategoryId} />

                                {/* Recommended Section */}
                                <RecommendedSection navigation={navigation} data={recommendedProperty} catId={selectedCategoryId} />

                                {/* Types */}
                                {renderTypes()}

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
                            )                          
                        }
                        ListFooterComponent={
                            <View style={{height:200}} />
                        }
                    />
            }



        </View>
    )
}

function mapStateToProps( state ) {

    return {
        // selectedProperties: state?.propertyReducer?.allProperties,
        selectedCats: state?.propertyReducer?.allCategories,
        // selectedPopular: state?.propertyReducer?.popular,
        // selectedRecommended: state?.propertyReducer?.recommended,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        // setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
        setAllCats: selectedCats => dispatch( getAllCats( selectedCats ) ),
        // setPopularList: selectedPopular => dispatch( getPopularProp( selectedPopular ) ),
        // setRecommendedList: selectedRecommended => dispatch( getRecommendedProp( selectedRecommended ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( Home )
