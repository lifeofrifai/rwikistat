import Setting from "../../components/Setting"
import { AuthContextProvider } from '../../context/authContext';

export default () => {

    
    return (
<AuthContextProvider>
    <Setting/>
    </AuthContextProvider>
        
    )
}
