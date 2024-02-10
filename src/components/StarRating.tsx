import React from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface StarRating {
  score: number;
}


const StarRating =({
    score
}:StarRating) => {

    const getStarCount = () => {
        if (score >= 0 && score <= 50) {
            return 1;
        } else if (score > 50 && score <= 100) {
            return 2;
        } else if (score > 100 && score <= 150) {
            return 3;
        } else if (score > 150 && score <= 200) {
            return 4;
        } else {
            return 5;
        }
    };

    const filledStars = getStarCount();
    
    return (
        <View className='flex-row'>
            {Array.from({ length: filledStars }).map((_, index) => (
                <View key={index} className=' '>
                    <AntDesign name="star" size={20} color="#F6C806" />
                </View>
            ))}
        </View>
    )
}

export default StarRating;
