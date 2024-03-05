import GraphImage from '../../../components/GraphImage';
import { AuthContextProvider } from '../../../context/authContext';

export default () => {

    
    return (
    <AuthContextProvider>
        <GraphImage/>
    </AuthContextProvider>
        
    )
}
