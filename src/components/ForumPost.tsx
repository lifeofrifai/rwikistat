import { Image, Pressable, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Ionicons from "react-native-vector-icons/Ionicons";
import LikedButton from "./button/card-button/LikedButton";
import Comment from "./button/card-button/Comment";
import BookmarkButton from "./button/card-button/BookmarkButton";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";


interface ForumPost{
    imageProfile: any,
    namePost: any,
    timePost: any,
    titlePost: any,
    descPost: any,
    onPress: any,
    imagePost: any,
    verified: boolean,
}

const ForumPost = ({
    imageProfile,
    namePost,
    timePost,
    titlePost,
    descPost,
    onPress,
    imagePost,
    verified
}:ForumPost) => {

    const toast = useToast();

    return(
        <View className="w-full bg-white px-4 mt-2">
            <View className="flex-row py-2 justify-between" >
                <View className="flex-row">
                    <Image
                        source={{
                            uri: imageProfile
                        }}
                        className="w-11 h-11 rounded-md"
                    />
                    <View className="justify-center ml-3">
                        <View className="flex-row items-center">
                            <Text className="font-bold text-gray-700 text-base">
                                {namePost}
                            </Text>
                            {verified ? (<MaterialIcons name="verified" size={18} color={"#00726B"} className="ml-3"/>) : ("")  }
                        </View>
                        <Text className="text-gray-400 text-xs">
                            {timePost}
                        </Text>
                    </View>
                </View>
                <Ionicons
                    onPress={() => toast.show("Link Copied", { duration: 2000, type: "success" })}
                    name={"link"}
                    size={20}
                    color={"black"}
                />
            </View>
            <Pressable
                className="pb-4 pt-2"
                onPress={onPress}
            >
                <Text className="font-bold text-gray-700 text-lg">
                    {titlePost}
                </Text>
                <Text className="text-gray-500 text-sm">
                    {descPost}
                </Text>
                <Image
                    source={imagePost}
                    className="w-full"
                />
            </Pressable>
            <View className="h-[1] bg-gray-200 w-full rounded-full"/>
            <View className="flex-row  py-2 items-center justify-between" >
                <View className="flex-row">
                    <LikedButton/>
                    <Comment/>
                </View>
                <View className="flex-row items-center">
                    <BookmarkButton/>
                </View>
            </View>
        </View>
    )
}

export default ForumPost;