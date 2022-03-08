import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

// Components
import TopProfileButton from '../../components/TopProfileButton';
import Header from '../../components/Header';
import CardItem from '../../components/CardItem';

import { FONTS,COLORS,SIZES } from '../../constants/theme';
import icons from '../../constants/icons';

import { myCards, allCards } from '../../constants/constants';
import TextButton from '../../components/TextButton';

const MyCards = ({ navigation, route }) => {

    const [propertyItem, setPropertyItem] = React.useState()
    const [qnt, setQnt] = React.useState(1)
    const [selectedCard, setSelectedCard] = React.useState(null)

    React.useEffect(() => {
        if( route.params )
        {
            const property = route.params.item
            const propertyQnt = route.params.qnt
            if(property) setPropertyItem(property)
            if(propertyQnt) setQnt(propertyQnt)
        }
    },[])


    const progress = useDrawerProgress()
    const scale = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [1, 0.8]
    } )
    const borderRadius = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [0, 26]
    } )
    const animatedStyle = { borderRadius, transform: [{scale}] }

    // Render Sections
    const renderCards = () => {
        return (
            <View>
                {myCards.map( ( item, index ) => (
                    <CardItem
                        item={item}
                        isSelected={false}
                        onPress={() => setSelectedCard({...item, key:"MyCard"})}
                        key={`myCard-${item.id}`}
                        isSelected={ `${selectedCard?.key}-${selectedCard?.id}` == `MyCard-${item?.id}` }
                    />
                ) )}
            </View>
        )
    }

    const renderAddNewCard = () => {
        return (
            <View
                style={{
                    marginTop:SIZES.padding
                }}
            >
                <Text style={{...FONTS.h3}}>Add New Card</Text>

                {
                    allCards.map( (item,index) => (
                        <CardItem
                        item={item}
                        isSelected={false}
                        onPress={() => setSelectedCard({...item, key:"NewCard"})}
                        key={`NewCard-${item.id}`}
                        isSelected={ `${selectedCard?.key}-${selectedCard?.id}` == `NewCard-${item?.id}` }
                    />
                    ) )
                }

            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={{
                paddingTop:SIZES.radius,
                paddingBottom:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}>
                <TextButton
                    buttonContainerStyle={{
                        height:60,
                        borderRadius:SIZES.radius,
                        backgroundColor: selectedCard == null ? COLORS.gray : COLORS.primary
                    }}
                    label={selectedCard?.key == "NewCard" ? "Add" : "Place Your Order"}
                    disabled={selectedCard == null}
                    onPress={() => {
                        if( selectedCard?.key == "NewCard" ){
                            navigation.navigate("AddCard", {
                                selectedCard: selectedCard
                            })
                        }
                        else{
                            navigation.navigate("Checkout", {
                                selectedCard: selectedCard
                            })
                        }
                    }}
                />
            </View>
        )
    }

    return (
        <Animated.View
            style={{
                flex: 1,
                 backgroundColor: COLORS.white,
                 ...animatedStyle
            }}
        >
            {/* Header */}
            <Header
                containerStyle={{
                    height:50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}
                title='MyCards'
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            height:40,
                            justifyContent:"center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            style={{
                                width:20,
                                height:20,
                                tintColor:COLORS.gray2
                            }}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TopProfileButton navigation={navigation} />
                }
            />

            {/* Cart List */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow:1,
                    marginTop:SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom:SIZES.radius
                }}
            >
                {/* My Card */}
                {renderCards()}

                {/* Add New Card */}
                {renderAddNewCard()}

            </ScrollView>

            {/* Footer */}
            {renderFooter()}

        </Animated.View>
    )
}

export default MyCards

const styles = StyleSheet.create({})
