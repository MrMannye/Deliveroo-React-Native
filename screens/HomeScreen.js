import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FeatureRow from '../components/FeatureRow';
import Categories from '../components/Categories';

import {
    UserIcon,
    ChevronDownIcon,
    AdjustmentsHorizontalIcon,
    MagnifyingGlassCircleIcon
} from "react-native-heroicons/outline"
import sanityClient from '../sanity';


export default function HomeScreen() {

    const navigation = useNavigation();
    const [featuredCards, setFeaturedCards] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "featured"]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }
        `).then(data => {
            setFeaturedCards(data);
        })
        console.log(featuredCards);
    },[])

    return (
        <SafeAreaView className="p-2 my-12 mb-28">
            {/* Header */}
            <View className="flex-row justify-between pb-3 items-center mx-4">
                <View className="flex-row items-center space-x-2">
                    <Image
                        source={{ uri: "https://links.papareact.com/wru" }}
                        className="w-7 h-7 bg-gray-300 p-4 rounded-full"
                    />
                    <View>
                        <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                        <Text className="font-bold text-xl">
                            Current Location
                            <ChevronDownIcon color={"#00CCBB"} size={20} />
                        </Text>
                    </View>
                </View>
                <UserIcon size={35} color="#00CCBB" />
            </View>
            <View className="flex-row items-center space-x-4 mx-4 mb-2">
                <View className="flex-row items-center flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassCircleIcon color="gray" size={20} />
                    <TextInput placeholder='Restaurants and cousines' keyboardType='default' />
                </View>
                <AdjustmentsHorizontalIcon color={"#00CCBB"} />
            </View>

            {/* Body */}
            <ScrollView
                className=""
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 0,
                }}
            >
                {/* Categories */}
                <Categories></Categories>

                {/* Features Row */}
                {featuredCards?.map((category) => (
                    <FeatureRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>

        </SafeAreaView>
    )
}