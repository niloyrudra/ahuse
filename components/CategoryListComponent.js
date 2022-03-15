import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

import { COLORS, SIZES, FONTS } from '../constants/theme';

const CategoryListComponent = ( {typeId, catTaxonomies, catId, isCatLoading, onChangeHandler} ) => {

    if (isCatLoading ) {    
        return (
            <>
                <FlatList
                    horizontal
                    data={[1,2,3,4,6,7]}
                    keyExtractor={item => `${item}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 30,
                        marginBottom: 20
                    }}
                    renderItem={ ( { item, index } ) => (
                        <View
                            style={{
                                flex:1,
                                height: 55,
                                width: 90,
                                marginTop: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == 6 ? SIZES.padding : 0,
                                paddingHorizontal: 8,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGray2,
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                        />
                    )}
                />
            </>
        );
    }
    
    return (
        <FlatList
            horizontal
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
                        flex:1,
                        height: 55,
                        marginTop: SIZES.padding,
                        marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                        marginRight: index == catTaxonomies.length - 1 ? SIZES.padding : 0,
                        paddingHorizontal: 8,
                        borderRadius: SIZES.radius,
                        backgroundColor: catId == item.id ? COLORS.primary : COLORS.lightGray2,
                        justifyContent:"center",
                        alignItems:"center"
                    }}
                    onPress={() => onChangeHandler(item.id, typeId)}
                >
                    <Text
                        style={{
                            color: catId == item.id ? COLORS.white : COLORS.darkGray,
                            alignSelf: 'center',
                            // marginRight: SIZES.base,
                            marginHorizontal: SIZES.base,
                            ...FONTS.h3
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
}

export default CategoryListComponent