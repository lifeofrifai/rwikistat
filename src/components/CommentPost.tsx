import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";


interface CommentPost{
    imageProfile: any,
    nameComment: any,
    timeComment: any,
    comment: any,
    verified: boolean,
}

const CommentPost = ({
    imageProfile,
    nameComment,
    timeComment,
    comment,
    verified,
}:CommentPost) => {

    const date = new Date(timeComment * 1000);
    const timeNow = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false, day: 'numeric', month: 'long', year: 'numeric'});

    return(
        <View className=" ">
            <View className="flex-row py-2" >
                <Image
                    source={{
                        uri: imageProfile
                    }}
                    className="w-11 h-11 rounded-md"
                />
                <View className="justify-center ml-3">
                    <View className="flex-row items-center">
                        <Text className="font-bold text-gray-700 text-base">
                            {nameComment}
                        </Text>
                        {verified ? (<MaterialIcons name="verified" size={18} color={"#00726B"} className="ml-3"/>) : ("")  }
                    </View>
                    <Text className="text-gray-400 text-xs">
                        {timeNow}
                    </Text>
                </View>
            </View>
            <View className="py-2" >
                <Text className="text-gray-500 text-sm">
                    {comment}
                </Text>
            </View>
            <View className="h-[1] bg-gray-200 w-full rounded-full mb-2"/>
        </View>
    )
}

export default CommentPost;