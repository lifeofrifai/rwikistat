import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Button } from "react-native";
import { useKeyboard } from '@react-native-community/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import ROUTES from "../../../constans/routes";
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import {
    createStackNavigator,
    HeaderStyleInterpolators,
    type StackNavigationOptions,
    type StackScreenProps,
  } from '@react-navigation/stack';
import { useState } from 'react';

NativeWindStyleSheet.setOutput({
    default: "native",
});


export default () => {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#EBEBEB] ">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0 || Platform.OS == 'android' ? 10: 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View className="flex-row justify-end h-[70]  bg-white px-5 py-4" >
                    <MiniPrimaryButton
                        label="Compile"
                        icon="play-circle"
                        onPress={toggleModal}    
                        disabled={undefined}
                        loading={undefined}             
                    />
                    <Modal
                        isVisible={isModalVisible}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        onSwipeComplete={toggleModal}
                    >
                        <View className=' justify-center items-center h-1/2 px-10 py-10 bg-white rounded-lg'>
                            <View>
                                <Button title="Hide modal" onPress={toggleModal} />
                            </View>
                        </View>
                    </Modal>
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