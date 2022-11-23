import { View, Text, ScrollView, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import CategoryCard from './CategoryCard'
import sanityClient from '../sanity';
import { urlFor } from '../sanity';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "category"]`).then(data => {
                setCategories(data);
        })
        console.log(categories);
    },[])

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop:20
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {/* CategoryCard */}

            {categories?.map((categorie) => (
                <CategoryCard 
                    key={categorie._id}
                    imgUrl={urlFor(categorie.image).width(200).url()}
                    title={categorie.name}
                />
            ))}
        </ScrollView>
    )
}

export default Categories