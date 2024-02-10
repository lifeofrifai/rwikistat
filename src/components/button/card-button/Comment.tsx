import React from "react";
import { View, Text } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Comment =() =>{
    return(
        <View className="flex-row items-center">
            <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
            <Text className="ml-1 text-gray-400 text-xs">
            </Text>
        </View>

    )
}
export default Comment