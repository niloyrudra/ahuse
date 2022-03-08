import React from 'react'
import { Text, View, Animated, TouchableWithoutFeedback, Modal, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import FilterSection from '../../components/FilterSection';


// Component
import IconButton from '../../components/IconButton';
import TwoPointSlider from '../../components/TwoPointSlider';
import LineDivider from '../../components/LineDivider';
// Constants
import constants from '../../constants/constants';
import icons from '../../constants/icons';

import { COLORS ,FONTS ,SIZES } from '../../constants/theme'
import TextButton from '../../components/TextButton';

const FilterModal = ({ data, refEle, isVisible, catList, typeList, areaList, onClose, onGenerateSearchData, onShowSearchModal=null }) => {
    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const [ areas, setAreas ] = React.useState([])
    const [ types, setAllTypes ] = React.useState([])
    const [ selectedCatId, setSelectedCatId ] = React.useState(1)
    const [selectedTypeId, setSelectedTypeId] = React.useState(1)
    const [selectedAreaId, setSelectedAreaId] = React.useState(1)
    const [distance, setDistance] = React.useState(1)
    const [price, setPrice] = React.useState(0)
    const [ showFilterModal, setShowFilterModal ] = React.useState(isVisible)

    React.useEffect(() => {
        if(catList && catList[0]) setSelectedCatId(catList[0].id)
    }, [catList])

    React.useEffect(() => {
        if( typeList ) setAllTypes( typeList )
    },[typeList])

    React.useEffect(() => {
        if( areaList ) setAreas( areaList )
        setSelectedAreaId(areaList[0].id)
    },[areaList])

    React.useEffect(() => {
        if(typeList && typeList[0]) setSelectedTypeId( typeList[0].id )
    },[typeList])

    React.useEffect(() => {
        if(showFilterModal)
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
    }, [showFilterModal])

    const modalY = modelAnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [SIZES.height, SIZES.height - 680]
    })

    // Render Sections
    const renderDistance = () => {
        return (
            <FilterSection
                    title="Distance"
                    containerStyle={{
                        marginBottom:20
                    }}
            >
                <View
                    style={{
                        alignItems:"center",
                    }}
                >
                    <TwoPointSlider
                        values={[3, 10]}
                        min={1}
                        max={20}
                        postfix="km"
                        prefix=""
                        onValuesChange={ (values) => setDistance(values[1]) }
                    />
                </View>
            </FilterSection>
        )
    }
    
    const renderCategory = () => {
        return (
            <FilterSection
                    title="Category"
                    // containerStyle={{}}
            >
                <FlatList
                    horizontal
                    data={catList}
                    keyExtractor={item => `${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        // marginTop: 30,
                        marginBottom: 20
                    }}
                    renderItem={ ( { item, index } ) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                flex:1,
                                height: 55,
                                marginTop: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == catList.length - 1 ? SIZES.padding : 0,
                                paddingHorizontal: 8,
                                borderRadius: SIZES.radius,
                                backgroundColor: selectedCatId == item.id ? COLORS.primary : COLORS.lightGray2,
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                            onPress={() => setSelectedCatId(item.id) }
                        >
                            {/* <Image
                                source={icons.category}
                                style={{
                                    width:12,
                                    height:12,
                                    marginRight: SIZES.base,
                                    tintColor: selectedCatId == item.id ? COLORS.white : COLORS.gray
                                }}
                            /> */}
                            <Text
                                style={{
                                    color: selectedCatId == item.id ? COLORS.white : COLORS.darkGray,
                                    // alignSelf: 'center',
                                    // marginRight: SIZES.base,
                                    textAlign:"center",
                                    ...FONTS.h3
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </FilterSection>
        )
    }

    const renderPrice = () => {
        return (
            <FilterSection
                    title="Price"
                    containerStyle={{
                        marginBottom:20
                    }}
            >
                <View
                    style={{
                        alignItems:"center",
                    }}
                >
                    <TwoPointSlider
                        values={[5, 50]}
                        min={0.01}
                        max={200}
                        step={0.1}
                        postfix="m"
                        prefix={constants.currency}
                        onValuesChange={(values) => setPrice(values)}
                    />
                </View>
            </FilterSection>
        )
    }

    const renderTypes = () => {
        return (
            <FilterSection
                    title="Types"
            >
                <FlatList
                    horizontal
                    data={types}
                    keyExtractor={item => `${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        // marginTop: 30,
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
                                marginRight: index == types.length - 1 ? SIZES.padding : 0,
                                paddingHorizontal: 8,
                                borderRadius: SIZES.radius,
                                backgroundColor: selectedTypeId == item.id ? COLORS.primary : COLORS.lightGray2,
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                            onPress={() => setSelectedTypeId(item.id)}
                        >
                            <Text
                                style={{
                                    color: selectedTypeId == item.id ? COLORS.white : COLORS.darkGray,
                                    // alignSelf: 'center',
                                    // marginRight: SIZES.base,
                                    textAlign:"center",
                                    ...FONTS.h3
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </FilterSection>
        )
    }

    const renderNeighbourhoods = () => {
        return (
            <FilterSection
                    title="Neighbourhood"
            >
                <FlatList
                    horizontal
                    data={areas}
                    keyExtractor={item => `${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        // marginTop: 30,
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
                                marginRight: index == areas.length - 1 ? SIZES.padding : 0,
                                paddingHorizontal: 8,
                                borderRadius: SIZES.radius,
                                backgroundColor: selectedAreaId == item.id ? COLORS.primary : COLORS.lightGray2,
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                            onPress={() => setSelectedAreaId(item.id)}
                        >
                            <Text
                                style={{
                                    color: selectedAreaId == item.id ? COLORS.white : COLORS.darkGray,
                                    // alignSelf: 'center',
                                    // marginRight: SIZES.base,
                                    textAlign:"center",
                                    ...FONTS.h3
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </FilterSection>
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
                    onPress={() => setShowFilterModal(false)}
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
                        <Text
                            style={{flex:1,...FONTS.h3, fontSize:18}}
                        >Filter Your Search</Text>

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
                            onPress={() => setShowFilterModal(false)}
                        />

                        
                    </View>

                    {/* Filter Form Section */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 250
                        }}
                    >
                        {/* Distance Section */}
                        {renderDistance()}

                        {/* Category Section */}
                        {renderCategory()}

                        {/* Price Section */}
                        {renderPrice()}

                        {/* Types Section */}
                        {renderTypes()}

                        {/* Areas Section */}
                        {renderNeighbourhoods()}


                    </ScrollView>


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
                            label="Apply Filters"
                            buttonContainerStyle={{
                                height:50,
                                borderRadius:SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={() => {
                                refEle.current = ''
                                if(data)
                                {
                                    let propertyData = data.filter( item => item.cat_ids.includes( selectedCatId ) && item.cad_ids.includes( selectedTypeId ) && item.area_ids.includes( selectedAreaId ) && item.price >= price )

                                    console.log(propertyData.length)
                                    onGenerateSearchData(propertyData)
                                    if(onShowSearchModal) onShowSearchModal()
                                }
                                setShowFilterModal(false)
                            }}
                        />

                    </View>

                </Animated.View>

            </View>
            
        </Modal>
    )
}

export default FilterModal
