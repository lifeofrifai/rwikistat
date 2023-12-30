import { AuthContextProvider } from '../../context/authContext';
import ForumHome from '../../components/ForumHome';


import { NativeWindStyleSheet } from "nativewind";
import { View, Text } from "react-native";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    return (
        <AuthContextProvider>
            <ForumHome/>
        </AuthContextProvider>
    );
}