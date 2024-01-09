import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, TextInput } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import ForumPost from "../../../components/ForumPost";
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <ScrollView className="w-full">
            <ForumPost
                imageProfile={undefined}
                namePost="{undefined}"
                timePost="6 Hours Ago"
                titlePost="{detailForum.data.title}"
                descPost="{detailForum.data.topics}"
                onPress={undefined}
                imagePost={undefined}
                verified={false}                
            />
            <View className="flex-row m-auto w-full justify-center items-center  bg-white px-16 py-4" >
                <TextInput
                    className="flex-row w-full rounded-md border justify-between h-10 items-center border-gray-400 p-3 mr-3"
                    placeholder="Tambahkan Komentar..."
                    placeholderTextColor="#aaa"
                    value={undefined}
                    // onChangeText={(text) => handleCommentInputChange('text', text)}
                />
                    <MiniPrimaryButton
                        label="Kirim"
                        icon={undefined}
                        onPress={undefined} 
                        disabled={undefined}
                        loading={undefined}             
                    />
            </View>
            {/* {comments.length > 0 ? (
            <View className="w-full bg-white px-4 mt-2 py-4">
            {comments.map((comment: any) => (
                <CommentPost
                    key={comment.id}
                    imageProfile={comment.user.photoURL}
                    nameComment={comment.user.displayName}
                    timeComment="2 Hours Ago"
                    comment={comment.data.text}         
                />
                ))}
            </View>
            ) : null} */}

            </ScrollView>
        </View>
        </ToastProvider>
        
    );
}