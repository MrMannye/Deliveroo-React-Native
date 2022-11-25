import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selecBasketItemsWithId } from '../features/basketSlice'

const DishRow = ({ id, name, description, price, image }) => {


    const [ispressed, setIspressed] = useState(false);
    const items = useSelector((state) => selecBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }
    const removeItemFromBasket = () => {
        if(!items.length > 0) return;
        dispatch(removeItemFromBasket({id}))
    }


    return (
        <>
            <TouchableOpacity onPress={() => {setIspressed(!ispressed)}} 
            className={`bg-white border p-4 border-gray-200 ${ispressed && "border-b-0"}`}>
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Text>{price} USD</Text>
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
                            disabled={!items.length}
                            onPress={removeItemFromBasket}
                            color={items.length > 0 ? "#00CCBB" : "gray"}
                            size={28}
                        />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity>
                        <PlusCircleIcon
                            color={true ? "#00CCBB" : "gray"}
                            size={28}
                            onPress={addItemToBasket}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </>
    )
}

export default DishRow