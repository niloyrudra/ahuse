import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';

// Constants
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import constants from '../../constants/constants';
import icons from '../../constants/icons';

// Component
import TextInputComponent from '../../components/TextInputComponent'
import SwitchButtonComponent from '../../components/SwitchButtonComponent';
import TextButton from '../../components/TextButton'
import ExpoImagePickerComponent from '../../components/ExpoImagePickerComponent';
import PickerComponent from '../../components/PickerComponent';
import DatePickerComponent from '../../components/DatePickerComponent';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { insertNewProperty } from '../../store/property/propertyActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GooglePlacesInput from '../../components/GoogleAutoCompleteInput';

const AddProperty = ({ navigation, route }) => {
    
    const dispatch = useDispatch()
    const [userId, setUserId] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [propertyStatus, setPropertyStatus] = React.useState([])
    const [city, setCity] = React.useState([])
    const [countyState, setCountyState] = React.useState([])
    const [area, setArea] = React.useState([])
    const [features, setFeatures] = React.useState([])
    const [typeOrActionCat, setTypeOrActionCat] = React.useState([])
    const [categories, setCategories] = React.useState([])

    const [requestStatus, setRequestStatus] = React.useState({
        success:false,
        fail:false,
        msg:''
    });

    // const user_Id = useSelector( state => state.userReducer?.userId )

    React.useEffect(() => {
        let mounted = true;
            (async () => {
                try{
                    const token = await AsyncStorage.getItem('token')
                    const userId = await AsyncStorage.getItem('userId')
                    if(token && userId){
                        console.log("ADD_LISTING", userId, token)
                        // console.log(token)
                        if( mounted ){
                            setUserId(userId)
                            setIsLoggedIn(true)
                        }
                    }
                    else{
                        // console.log(token)
                        if( mounted ){
                            setUserId(null)
                            setIsLoggedIn(false)
                        }
                    }
                }
                catch(err){
                    setIsLoggedIn(false)
                }
            })()
        
        return () => {
            mounted = false
        }
    }, [])

    const { register, setValue, handleSubmit, control, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
          title: '',
          content: '',
          imageUri: '',
          cat: '',
          action_category: '',
          listedIn: '',
          propertyStatus: '',
          address: '',
          county_state: '',
          country: '',
          city: '',
          zip: '',
          neighborhood: '',
          price: '',
          beforePrice: '',
          afterPrice: '',
          yrTaxRate: '',
        //   ownersFee:'',
          featured: '',
          size: '',
          lotSize: '',
          rooms: '',
          bathrooms: '',
          bedrooms: '',
          energyIndex:'',
          energyClasses:'',
          garages: '',
          garageSize: '',
          year: '',
          yearTax:'',
          garden:'',
          date:'',
          availability:'',
          basement:'',
          extConstruction:'',
          roofing:'',
          use_floor_plans:'',
          attic:'',
          "gas-heat":'',
          "wine-cellar":'',
          'basketball-court':'',
          gym:'',
          pound:'',
          fireplace:'',
          "ocean-view":'',
          "lake-view":'',
          pool:'',
          "back-yard":'',
          "front-yard":'',
          "fenced-yard":'',
          sprinklers:'',
          "washer-and-Dryer":'',
          deck:'',
          balcony:'',
          laundry:'',
          concierge:'',
          "chair-accessible":'',
          doorman:'',
          "private-space":'',
          storage:'',
          recreation:'',
          "roof-deck":'',
        //   "header_type":false,
        //   min_height:false,
        //   max_height:false,
        //   keep_min:false,
        //   keep_max:false,
        //   pageCustomImage:false,
          internet:false,
        },
        mode: 'onBlur'
    });

    const selectedToken = useSelector( state => state.userReducer.token )
    const selectedStatus = useSelector( state => state.propertyReducer?.allTax?.status )
    const selectedCity = useSelector( state => state.propertyReducer?.allTax?.city )
    const selectedCountyState = useSelector( state => state.propertyReducer?.allTax?.county_state )
    const selectedArea = useSelector( state => state.propertyReducer?.allTax?.area )
    const selectedFeature = useSelector( state => state.propertyReducer?.allTax?.features )
    const selectedCategories = useSelector( state => state.propertyReducer?.allTax?.cat )
    const selectedTypes = useSelector( state => state.propertyReducer?.allTax?.action_cat )

    React.useEffect(() => {
        if(selectedToken) setToken(selectedToken)
    }, [selectedToken])
    
    React.useEffect(() => {
        if(selectedStatus){
            setPropertyStatus(selectedStatus)
        }
    }, [selectedStatus])
    
    React.useEffect(() => {
        if(selectedCity){
            setCity(selectedCity)
        }
    }, [selectedCity])
    
    React.useEffect(() => {
        if(selectedCountyState){
            setCountyState(selectedCountyState)
        }
    }, [selectedCountyState])
    
    React.useEffect(() => {
        if(selectedArea){
            setArea(selectedArea)
        }
    }, [selectedArea])
    
    React.useEffect(() => {
        if(selectedCategories){
            setCategories(selectedCategories)
        }
    }, [selectedCategories])

    React.useEffect(() => {
        if(selectedTypes){
            setTypeOrActionCat(selectedTypes)
        }
    }, [selectedTypes])

    React.useEffect(() => {
        if(selectedFeature){
            setFeatures(selectedFeature)
        }
    }, [selectedFeature])

    // Submit Handler
    const onSubmit = data => {
        if(!userId) {
            Alert.alert(
                "Warning!",
                "To add property in your listing, you need to be a registered user and should login before proceeding. Thank you!",
                [
                    {
                        text: "Login",
                        onPress: () => navigation.navigate("Auth"),
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }
                ]
            );
            return;
        }
        setIsLoading(true)
        setRequestStatus({
            success:false,
            fail:false,
            msg:''
        })
        if(data) {
            data.author_id = userId
            dispatch( insertNewProperty( data, token, setIsLoading, setRequestStatus ) )
        }
    };

    return (
        <KeyboardAwareScrollView
            keyboardDismissMode='on-drag'
            extraScrollHeight={-200}

            contentContainerStyle={{
                flexGrow:1,
                marginTop:SIZES.radius,
                paddingHorizontal: SIZES.padding,
                paddingBottom: 20
            }}
        >   
            <>
                <TextInputComponent
                    name="title"
                    placeholder="Property Title"
                    isRequired={true}
                    control={control}
                    errors={errors}
                    errorMsg="Title is required"
                />

                <TextInputComponent
                    name="content"
                    placeholder="Property description"
                    isRequired={true}
                    numberOfLines={6}
                    multiline={true}
                    control={control}
                    errors={errors}
                    errorMsg="Description is required"
                    textAlignVertical="top"
                    additionalCss={{
                        height:170,
                        justifyContent:"flex-start",
                        alignItems:"flex-start"
                    }}
                />

                <PickerComponent
                    name="category"
                    label="Category"
                    optionList={categories}
                    control={control}
                />

                <PickerComponent
                    name="action_category"
                    label="Types"
                    optionList={typeOrActionCat}
                    control={control}
                />

                <PickerComponent
                    name="propertyStatus"
                    label="Property Status"
                    optionList={propertyStatus}
                    control={control}
                />

                <Text style={{...styles.header, marginBottom:10}}>Upload Image</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <ExpoImagePickerComponent onChange={onChange} value={value} />
                    )}
                    name="imageUri"
                />

                <Text style={{...styles.header, marginBottom:10}}>Select your address</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => ( 
                        <GooglePlacesInput  onChange={onChange} onBlur={onBlur} />
                    )}
                    name="address"
                    rules={{ required: { value: true, message: "Address is required" } }}
                />
                {errors.address && <Text style={{
                    color:'red',
                    marginTop:4,
                    letterSpacing:0.5,
                    ...FONTS.body5
                    }}
                >{errors.address.message}</Text>}
                
                <PickerComponent
                    name="county_state"
                    label="County or State"
                    optionList={countyState}
                    control={control} />

                <PickerComponent
                    name="city"
                    label="City"
                    optionList={city}
                    control={control} />

                <PickerComponent
                    name="neighborhood"
                    label="Neighborhood"
                    optionList={area}
                    control={control} />

                <Text style={styles.label}>Postal/Zip Code</Text>
                <TextInputComponent
                    name="zip"
                    placeholder="Postal/Zip code"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <Text style={styles.header}>Price Details</Text>
                <TextInputComponent
                    name="price"
                    kbType="numeric"
                    placeholder="ex. 20,000,000"
                    isRequired={false}
                    control={control}
                    errors={errors} errorMsg=""
                />

                <TextInputComponent
                    name="beforePrice"
                    kbType=""
                    placeholder="Before Price (ex: 'from ')"
                    isRequired={false}
                    control={control}
                    errors={errors} errorMsg=""
                />

                <TextInputComponent
                    name="afterPrice"
                    kbType=""
                    placeholder="After Price (ex: '/month ')"
                    isRequired={false}
                    control={control}
                    errors={errors} errorMsg=""
                />

                <Text style={styles.header}>Details</Text>
                <TextInputComponent
                    name="size"
                    kbType="numeric"
                    placeholder="Size in m2 (*only numbers)"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <TextInputComponent
                    name="lotSize"
                    kbType="numeric"
                    placeholder="Lot Size in m2 (*only numbers)"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <TextInputComponent
                    name="rooms"
                    kbType="numeric"
                    placeholder="Rooms (*only numbers)"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <TextInputComponent
                    name="bedrooms"
                    kbType="numeric"
                    placeholder="Bedrooms (*only numbers)"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <TextInputComponent
                    name="bathrooms"
                    kbType="numeric"
                    placeholder="Bathrooms (*only numbers)"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <TextInputComponent
                    name="basement"
                    kbType=""
                    placeholder="Basement (*text)"
                    isRequired={false}
                    control={control}
                    errors={errors}
                    errorMsg=""
                />

                <PickerComponent name="garages" label="Garages" optionList={constants.garages} control={control} />
                <PickerComponent name="garageSize" label="Garage size" optionList={constants.garageSize} control={control} />

                <DatePickerComponent name="year" control={control} label="Year Built (*date)" />

                <DatePickerComponent name="availability" control={control} label="Available from (*date)" />

                <TextInputComponent name="extConstruction" kbType="" placeholder="External construction (*text)" isRequired={false} control={control} errors={errors} errorMsg="" />

                <TextInputComponent name="roofing" kbType="" placeholder="Roofing (*text)" isRequired={false} control={control} errors={errors} errorMsg="" />


                <Text style={styles.label}>Select Energy Class</Text>    
                <PickerComponent name="energyClasses" optionList={constants.energyClasses} control={control} />

                <TextInputComponent name="energyIndex" kbType="" placeholder="Energy Index in kWh/m2a" isRequired={false} control={control} errors={errors} errorMsg="" />

                <Text style={styles.header}>Featured Property</Text>
                <SwitchButtonComponent name="featured" label="Featured Property Setup" control={control} customLabelCss={{textTransform:"capitalize"}} isFeatured={true} />

                <Text style={styles.header}>Amenties and Features</Text>
                {
                    features &&
                    <View>
                        <FlatList
                            style={{flex:1}}
                            data={features}
                            keyExtractor={item => `${item.id}`}
                            renderItem={ ( { item, index } ) =>(
                                <SwitchButtonComponent name={item.slug} label={item.name} control={control} onChange={() => onChange(value)} customLabelCss={{textTransform:"capitalize"}} />
                            )}

                        />
                    </View>
                }

                {
                    userId == null
                    ?
                    <View
                        style={{flex:1}}
                    >
                        <TextButton
                            label={"Add To List"}
                            disabled={true}
                            buttonContainerStyle={{
                                backgroundColor: COLORS.transparentPrimray,
                                marginVertical:SIZES.padding,
                                height:55,
                                borderRadius:SIZES.radius
                            }}
                            labelStyle={{
                                color:COLORS.white,
                                ...FONTS.body3
                            }}
                            onPress={() => {}}
                        />
                        <Text style={{textAlign:"center",...FONTS.body3,color:COLORS.lightOrange}}>Please! sign in before trying submitting anything.</Text>
                    </View>
                    :
                    <TextButton
                        label={isLoading ? "Processing..." : "Add To List!"}
                        disabled={isLoading}
                        buttonContainerStyle={{
                            backgroundColor: isLoading ? COLORS.transparentPrimray : COLORS.primary,
                            marginVertical:SIZES.padding,
                            height:55,
                            borderRadius:SIZES.radius
                        }}
                        labelStyle={{
                            color:COLORS.white,
                            ...FONTS.body3
                        }}
                        onPress={handleSubmit(onSubmit)}
                    />
                }

                <View style={{
                    height:400}}>

                    {
                        requestStatus.msg !== '' && !isLoading &&
                            <View style={{
                                flex:1,
                                alignItems:"center",
                                justifyContent:"flex-start"
                            }}>
                                <Text style={{color: requestStatus.success ? COLORS.green : ( requestStatus.fail ? COLORS.red : COLORS.orange ),...FONTS.h3}}>{requestStatus.msg}</Text>
                            </View>
                    }
                </View>
            </>

        </KeyboardAwareScrollView>
        
        
    )
}

export default AddProperty

const styles = StyleSheet.create({
    label: {
        color: COLORS.primary,
        ...FONTS.body4,
        marginTop: 10,
        marginBottom:-10,
        marginLeft: 0,
    },
    header: {
        color: COLORS.primary,
        ...FONTS.body3,
        marginTop: 15,
        marginLeft: 0,
        letterSpacing:1,
    },
})
