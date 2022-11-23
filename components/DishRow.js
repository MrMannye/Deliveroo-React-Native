import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'

const DishRow = ({ id, name, description, price, image }) => {

    const [ispressed, setIspressed] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => {setIspressed(!ispressed)}} 
            className={`bg-white border p-4 border-gray-200 ${ispressed && "border-b-0"}`}>
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Text>{price} $MEX</Text>
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: "#F3F3F4"
                            }}
                            source={{ uri: urlFor(image).url() }}
                            className="h-20 w-20 bg-gray-300 p-4"
                        ></Image>
                    </View>
                </View>
            </TouchableOpacity>

            {ispressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity>
                        <MinusCircleIcon
                            color={true ? "#00CCBB" : "gray"}
                            size={28}
                        />
                        </TouchableOpacity>
                        <Text>0</Text>
                        <TouchableOpacity>
                        <PlusCircleIcon
                            color={true ? "#00CCBB" : "gray"}
                            size={28}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </>
    )
}

export default DishRow