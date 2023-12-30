import SignInForm from "../../components/SignInForm"
import { AuthContextProvider } from '../../context/authContext';

export default () => {

    
    return (
    <AuthContextProvider>
    <SignInForm/>
    </AuthContextProvider>
        
    )
}