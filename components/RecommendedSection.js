import React from 'react'
import { FlatList, View } from 'react-native'
import Section from './Section'
import HorizontalCard from './HorizontalCard'

import { COLORS, SIZES } from '../constants/theme'

const RecommendedSection = ({navigation, data, isLoading=null}) => {
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
                        <>
                            <View
                                style={{
                                    flexDirection: "row",
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.lightGray2,
                                    height:180,
                                    width: SIZES.width * 0.85,
                                    marginLeft: index == 0 ? SIZES.padding : 18,
                                    marginRight: index == data.length - 1 ? SIZES.padding : 0,
                                    paddingRight: SIZES.radius,
                                    alignItems: "center"
                                }}
                            />
                        </>
                    )}
                />
            </Section>
        )
    }

    return (
        <Section
            title="Recommended"
            onPress={() => navigation.navigate("MapScreen", {items:data})}
        >
            <FlatList
                data={data}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={ ({  item, index }) => (
                    <HorizontalCard
                        containerStyle={{
                            height:180,
                            width: SIZES.width * 0.85,
                            marginLeft: index == 0 ? SIZES.padding : 18,
                            marginRight: index == data.length - 1 ? SIZES.padding : 0,
                            paddingRight: SIZES.radius,
                            alignItems: "center"
                        }}
                        imageStyle={{
                            margin: 10,
                            borderRadius:SIZES.radius,
                            height: 150,
                            width: 150,
                        }}
                        item={item}
                        onPress={() => navigation.navigate("PropertyDetail", { item:item })}
                    />
                )}
            />
        </Section>
    )
}

export default RecommendedSection