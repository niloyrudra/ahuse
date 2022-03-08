import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../constants/theme';

const ExpoImagePickerComponent = (props) => {

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        // console.log('result -',result);
        if (!result.cancelled) {
            // setImage(result.uri);
            // props.onChange(result.uri) // Temp url
            // console.log('Props value - ',props.value)
            setImage(result.base64);
            props.onChange(result.base64) // base64 format
        }
    };

    if (hasGalleryPermission === false) {
      return (<Text>No access to camera</Text>);
    }
    
    return (
        <TouchableOpacity onPress={() => pickImage()}>
            {/* <View style={tw`flex flex-grow bg-white my-5 h-60 rounded-md overflow-hidden justify-center items-center `}> */}
            <View style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:SIZES.radius,
                height:200,
                backgroundColor:COLORS.lightGray1
            }}>
                <Text style={{
                    zIndex:10,
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    padding:12,
                    textTransform:'uppercase',
                    position:"absolute",
                    margin:"auto",
                    borderRadius:4
                }}>{ image ? 'Update Image From Gallery' : 'Pick Image From Gallery' }</Text>
                {
                    image &&
                        <Image
                            // source={ {uri: image } }
                            source={{ uri: 'data:image/jpeg;base64,' + image }}
                            style={{
                                flex:1,
                                height:"100%",
                                width:"100%",
                                borderRadius:SIZES.radius,
                            }}    
                        />
                }
                {/* <Image source={ image ? {uri: image } : require('../assets/bg-images/home.jpg')} style={tw`flex flex-grow h-full w-full`} /> */}
            </View>
        </TouchableOpacity>
    );
}

export default ExpoImagePickerComponent

// const styles = StyleSheet.create({})


