import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Pdf from 'react-native-pdf';
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "@react-native-community/hooks";
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import  ROUTES  from "../../../constans/routes";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-[#EBEBEB] ">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0 || Platform.OS == 'android' ? 10: 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="items-center bg-white">
                <View className="flex-row gap-3 h-[70]  bg-white px-5 py-4" >
                    <MiniPrimaryButton
                        label="Baca"
                        icon="book"
                        onPress={undefined}    
                        disabled={undefined}
                        loading={undefined}             
                    />
                    <MiniPrimaryButton
                        label="Compile"
                        icon="play-circle"
                        onPress={() => navigation.navigate(ROUTES.COMPILER_OUTPUT)}    
                        disabled={undefined}
                        loading={undefined}             
                    />
                </View>
                <CodeEditor
                    style={{
                        ...{
                            fontSize: 14,
                            inputLineHeight: 26,
                            highlighterLineHeight: 26,
                            lineNumbersColor:"#00726B",
                            width: "100%",
                        },
                        ...(keyboard.keyboardShown
                            ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                            : {}),
                    }}
                    language= 'r'
                    syntaxStyle={CodeEditorSyntaxStyles.atomOneLight}
                    showLineNumbers
                />
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
        
    );
}