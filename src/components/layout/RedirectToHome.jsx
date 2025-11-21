import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

const RedirectToHome = ({children}) => {
    const {isLoggedIn} = useAuth()

    if(isLoggedIn){
        return <Navigate to="/home"/>
    }
    return children;
}

export default RedirectToHome;