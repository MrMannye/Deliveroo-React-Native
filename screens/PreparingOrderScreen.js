import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("DeliveryOrder");
        },4000)
    },[])

    return (
        <SafeAreaView className="bg-[#f7c4ea] flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/order.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96 -mt-10"
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                delay={500}
                className="text-lg my-10 text-black font-bold text-center"
            >   
                Waiting for Restaurant to take your order!
            </Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color="black" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen