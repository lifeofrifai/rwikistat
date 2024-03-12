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
    onPressPost: any,
    onPressProfile: any,
    imagePost: any,
    verified: boolean,
    id:any
    likes: any,
    comments: any,
}

const ForumPost = ({
    imageProfile,
    namePost,
    timePost,
    titlePost,
    descPost,
    onPressPost,
    onPressProfile,
    imagePost,
    verified,
    id,
    likes,
    comments,
}:ForumPost) => {

    const toast = useToast();
    const date = new Date(timePost * 1000);
    const timeNow = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false, day: 'numeric', month: 'long', year: 'numeric'});

    // if (imagePost == null) {
    //     console.log("Tidak ada gambar")
    // } else {
    //     console.log("Ada gambar")
    // }

    return(
        <View className="w-full bg-white px-4 mt-2">
            <View className="flex-row py-2 justify-between" >
                <Pressable
                    className="flex-row "
                    onPress={onPressProfile}
                >
                    <Image
                        source={{
                            uri: imageProfile
                        }}
                        className="w-11 h-11 rounded-md"
                    />
                    <View className="justify-center ml-3">
                        <View className="flex-row items-center ">
                            <Text className="font-bold text-gray-700 text-base">
                                {namePost}
                            </Text>
                            {verified ? (<MaterialIcons name="verified" size={18} color={"#00726B"} className="ml-3"/>) : ("")  }
                        </View>
                        <Text className="text-gray-400 text-xs">
                            {timeNow}
                        </Text>
                    </View>
                </Pressable>
                {/* <Ionicons
                    onPress={() => toast.show("Link Postingan disalin", { duration: 2000, type: "success" })}
                    name={"link"}
                    size={20}
                    color={"black"}
                /> */}
            </View>
            <Pressable
                className="pb-4 pt-2"
                onPress={onPressPost}
            >
                <Text className="font-bold text-gray-700 text-lg">
                    {titlePost}
                </Text>
                <Text className="text-gray-500 text-sm">
                    {descPost}
                </Text>
                {
                imagePost == null ? ("") : (
                    <Image
                        source={{
                            uri: imagePost
                        }}
                        className="w-full h-[300]"
                    />
                )
                }
            </Pressable>
            <View className="h-[1] bg-gray-200 w-full rounded-full"/>
            <View className="flex-row  py-2 items-center justify-between" >
                <View className="flex-row ">
                    <LikedButton itemId={id}/>
                    <View className="ml-1 justify-center  mr-2">
                        <Text className="text-gray-400 text-xs ">
                            {likes}
                        </Text>
                    </View>
                    <Comment/>
                    <View className="justify-center ">
                        <Text className="text-gray-400 text-xs ">
                            {comments}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center">
                    <BookmarkButton itemId={id}/>
                </View>
            </View>
        </View>
    )
}

export default ForumPost;