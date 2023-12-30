import React from "react";
import { View, Text } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';


const LikedButton =() =>{
    const [likedButton, setLikedButton] = React.useState(false);
    return(
        <View className="flex-row items-center mr-3">
            <AntDesign
                onPress={() => setLikedButton((isLiked) => !isLiked)}
                name={likedButton ? "like1" :  "like2"}
                size={24}
                color={likedButton ? "#00726B" : "black"}
            />
            <Text className="ml-1 text-gray-400 text-xs">
                3
            </Text>
        </View>

    )
}
export default LikedButton