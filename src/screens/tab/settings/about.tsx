import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView } from "react-native";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="w-full bg-white h-32 mt-2">
                <Text className="text-black text-center">About Rwikistat Screen</Text>
            </View>
        </View>
        
    );
}