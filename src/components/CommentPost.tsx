import { View, Text, Image, Pressable } from "react-native";
import React from "react";


interface CommentPost{
    imageProfile: any,
    nameComment: any,
    timeComment: any,
    comment: any,
}

const CommentPost = ({
    imageProfile,
    nameComment,
    timeComment,
    comment,
}:CommentPost) => {

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
                    <Text className="font-bold text-gray-700 text-base">
                        {nameComment}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                        {timeComment}
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