import React from 'react'
import { FlatList } from 'react-native'
import Section from './Section'
import VerticalCard from './VerticalCard'

import { SIZES } from '../constants/theme'


const PopularSection = ({navigation, data}) => {
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