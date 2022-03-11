import React from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Switch,
    FlatList
} from 'react-native';
import { connect } from 'react-redux'
import { getAllProperties, getAllCats, getAllTaxData } from '../../store/property/propertyActions';
// Modal
import FilterModal from '../Home/FilterModal';
// import GooglePlacesInput from '../../components/GoogleAutoCompleteInput';
import LineDivider from '../../components/LineDivider';
import HorizontalCard from '../../components/HorizontalCard';
import icons from '../../constants/icons';
import images from '../../constants/images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

// Redux
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ navigation, route, selectedProperties, setAllCats }) => {

    const searchRef = React.useRef()
    let searchQueryTimeout;
    const dispatch = useDispatch()
    React.useEffect(() => dispatch( getAllTaxData() ), []);
    const allTaxData = useSelector( state => state.propertyReducer.allTax )

    const [properties, setProperties] = React.useState([])
    const [propertiesByType, setPropertiesByType] = React.useState([])
    const [filteredProperties, setFilteredProperties] = React.useState([])
    const [ selectedCategoryId, setSelectedCategoryId ] = React.useState()
    const [ typeId, setTypeId ] = React.useState()
    // Modals
    const [ showFilterModal, setShowFilterModal] = React.useState(false)
    const [ typeTaxonomies, setTypeTaxonomies ] = React.useState([])
    const [ catTaxonomies, setCatTaxonomies ] = React.useState([])
    const [ areaTaxonomies, setAreaTaxonomies ] = React.useState([])
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ isSales, setIsSales ] = React.useState(false)
    const [ isRental, setIsRental ] = React.useState(false)

    React.useEffect(() => {
        if( selectedProperties){
            setProperties( selectedProperties )
        }
        return () => setProperties([])
    },[selectedProperties])

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
        }
    },[catTaxonomies])

    React.useEffect(() => {
        setTypeId(typeTaxonomies[0]?.id)
        if(properties.length) setPropertiesByType(properties.filter( item => item.cad_ids == typeTaxonomies[0]?.id ))
    },[typeTaxonomies])

    return (
        <>
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
                    <Image
                        source={icons.search}
                        style={{
                            height:20,
                            width:20,
                            tintColor: COLORS.black
                        }}
                    />

                    <TextInput
                        ref={searchRef}
                        style={{
                            flex:1,
                            marginLeft:SIZES.radius,
                            ...FONTS.body3
                        }}
                        placeholder="Search Properties"
                        onChangeText={(value) => {
                            clearTimeout(searchQueryTimeout)
                            searchQueryTimeout = setTimeout(() => {
                                let data = []
                                searchRef.current = value
                                if(searchRef.current.length == 0) return
                                if(properties)
                                {
                                    const type = isSales ? 'Sales' : (isRental ? 'Rentals': '');
                                    if(type != ''){
                                        data = properties.filter( item => item.cad_names.includes( type ) && ( item.address.toLowerCase().includes( value.toLowerCase() ) || item.title.toLowerCase().includes( value.toLowerCase() ) ))
                                    }
                                    else {
                                        data = properties.filter( item => item.address.toLowerCase().includes( value.toLowerCase() ) || item.title.toLowerCase().includes( value.toLowerCase() ) )
                                    }
                                    if(data)
                                    {
                                        setFilteredProperties(data)
                                    }
                                }
                            }, 750)

                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            searchRef.current = ''
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
                        flexDirection:"row",
                        justifyContent:'space-between',
                        alignItems:"center",
                        height:40,
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
                            thumbColor={isSales ? COLORS.primary : "#f4f3f4"}
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
                            thumbColor={isRental ? COLORS.primary : "#f4f3f4"}
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

            <LineDivider />

            {
                filteredProperties.length
                ?
                    <View>

                        <FlatList
                            data={filteredProperties}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={ item => `${item.id}`}
                            ListHeaderComponent={
                                <Text style={{flex:1,...FONTS.h4,color:COLORS.darkGray,paddingHorizontal: SIZES.padding, paddingTop: SIZES.padding/2}} >Number of properties found - {filteredProperties.length}</Text>
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
                                        height:300
                                    }}
                                />
                            }
                        />
                    </View>
                :
                (
                    <View
                        style={{
                            flex:1,
                            alignItems:"center",
                            justifyContent:"flex-start",
                            paddingHorizontal:SIZES.padding
                        }}
                    >
                            <Image
                                source={images.srcScreenBgVct}
                                resizeMode='contain'
                                style={{
                                    width:'90%',
                                    tintColor:COLORS.lightGray1,
                                }}
                            />
                            <Text style={{color:COLORS.gray2,...FONTS.h3,marginTop:-40}}>Search for your property.</Text>
                    </View>
                )
            }

            {showFilterModal &&
                <FilterModal
                    refEle={searchRef}
                    data={properties}
                    isVisible={showFilterModal}
                    catList={catTaxonomies}
                    typeList={typeTaxonomies}
                    areaList={areaTaxonomies}
                    onClose={() => setShowFilterModal(false)}
                    onGenerateSearchData={(data) => setFilteredProperties(data)}
                />
            }
        </>
    )
}

function mapStateToProps( state ) {
    return {
        selectedProperties: state?.propertyReducer?.allProperties,
        selectedCats: state?.propertyReducer?.allCategories,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
        setAllCats: selectedCats => dispatch( getAllCats( selectedCats ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( Search )