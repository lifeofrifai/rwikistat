import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, Pressable } from "react-native";
import Foundation  from "react-native-vector-icons/Foundation";

NativeWindStyleSheet.setOutput({
    default: "native",
});



export default () => {
    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="flex-row w-full bg-white px-4 mt-2 py-2">
                <View className="w-44 h-36 bg-blue-300"/>
                <View className="flex-col ml-3">
                    <Text className="text-mainGreen text-lg font-semibold">image-plot-1-fix</Text>
                    <Pressable
                        className="bg-red-600 rounded-md w-24 mt-2"
                        onPress={() => console.log("delete")}
                    >
                        <Text className=" text-white text-base font-medium text-center">Delete</Text>
                    </Pressable>
                    <Pressable 
                        className="bg-mainGreen rounded-md w-24 mt-1"
                        onPress={() => console.log("download")}
                    >
                        <Text className=" text-white text-base font-medium text-center">Download</Text>
                    </Pressable>
                </View>
            </View>
            
        </View>
        
    );
}