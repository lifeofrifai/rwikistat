import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView } from "react-native";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    return (
        <View className="flex-1 items-center justify-center bg-[#EBEBEB] ">
            <Text>About Rwikistat Screen</Text>
        </View>
        
    );
}