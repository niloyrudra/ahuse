import React from 'react'
import { FlatList, View } from 'react-native'
import Section from './Section'
import VerticalCard from './VerticalCard'

import { COLORS, SIZES } from '../constants/theme'


const PopularSection = ({navigation, data, isLoading=null}) => {
    if(isLoading) {
        return (
            <Section
                title="Popular Properties"
                onPress={() => {}}
            >
                <FlatList
                    data={[1,2,3]}
                    keyExtractor={item => `${item}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={ ({  item, index }) => (
                        <View
                            style={{
                                width:200,
                                height:260,
                                borderRadius: SIZES.radius,
                                alignItems:"center",
                                padding: SIZES.radius,
                                backgroundColor: COLORS.lightGray2,
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == data.length - 1 ? SIZES.padding : 0,
                                padding: 18
                            }}
                        >
                            {/* <View style={{ flexDirection:"row" }}>
                                <View
                                    style={{
                                        flexDirection:"row",
                                        flex:1,
                                        width:"50%",
                                        height:20,
                                        BackgroundColor:COLORS.darkGray
                                    }}
                                />
                                <View
                                    style={{
                                        width:20,
                                        height:20,
                                        BackgroundColor:COLORS.darkGray
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    margin: 10,
                                    borderRadius:SIZES.radius,
                                    height: 150,
                                    width: 150,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            />

                            <View
                                style={{
                                    flex:1,
                                    alignItems:"center"
                                }}
                            >

                                <View
                                    style={{
                                        // ...FONTS.h3,
                                        // fontSize: 17,
                                        backgroundColor: COLORS.darkGray,
                                        ViewAlign:"center",
                                        height:20
                                    }}
                                />

                                <View
                                    style={{
                                        backgroundColor: COLORS.darkGray,
                                        // ...FONTS.body5,
                                        ViewAlign:"center",
                                        height:20
                                    }}
                                />

                                <View
                                    style={{
                                        marginTop: SIZES.radius,
                                        backgroundColor: COLORS.darkGray,
                                        // ...FONTS.body5,
                                        ViewAlign:"center",
                                        height:20
                                    }}
                                />

                            </View> */}
                            
                        </View>

                    )}
                />
            </Section>
        )
    }

    return (
        <Section
            title="Popular Properties"
            onPress={() => navigation.navigate("MapScreen", {items:data})}
        >    
            <FlatList
                data={data}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={ ({  item, index }) => (
                    <VerticalCard
                        containerStyle={{
                            marginLeft: index == 0 ? SIZES.padding : 18,
                            marginRight: index == data.length - 1 ? SIZES.padding : 0,
                            padding: 18
                        }}
                        imageStyle={{
                            margin: 10,
                            borderRadius:SIZES.radius,
                            height: 150,
                            width: 150,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        item={item}
                        onPress={() => navigation.navigate( "PropertyDetail", { item: item } ) }
                    />
                )}
            />
        </Section>
    )
}

export default PopularSection