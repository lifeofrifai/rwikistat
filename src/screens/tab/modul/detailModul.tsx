import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "@react-native-community/hooks";
import  ROUTES  from "../../../constans/routes";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import { createStackNavigator } from "@react-navigation/stack";
import Markdown from 'react-native-markdown-display';

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface DetailModulScreenProps {
    route: {
      params?: {
        id?: string;
      };
    };
  }

const DetailModulScreen: React.FC<DetailModulScreenProps> = ({ route }) => {

    const copy = `
    Hello  **world**! This is a _markdown_ document!
    asas
    Hello  **world**! This is a _markdown_ document!
    asas
    Hello  **world**! This is a _markdown_ document!
    asas
    Hello  **world**! This is a _markdown_ document!
    `;

    return (
        <ScrollView className="flex-1 bg-[#EBEBEB] "> 
            <View className="bg-white mt-2">
                <Markdown>
                    {copy}
                </Markdown>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    heading: {
      borderBottomWidth: 1,
      borderColor: '#000000',
    },
    heading1: {
      fontSize: 32,
      backgroundColor: '#000000',
      color: '#FFFFFF',
    },
    heading2: {
      fontSize: 24,
    },
    heading3: {
      fontSize: 18,
    },
    heading4: {
      fontSize: 16,
    },
    heading5: {
      fontSize: 13,
    },
    heading6: {
      fontSize: 11,
    }
  });

export default DetailModulScreen;