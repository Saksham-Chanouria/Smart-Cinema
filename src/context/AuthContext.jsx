import {createContext, useContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [firstName, setFirstName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');

        setFirstName("");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){return;}

        try{
            const decoded = jwtDecode(token);
            const exp = decoded.exp*1000;
            const now = Date.now();

            if(now>exp){
                logout();
            }
            else{
                setIsLoggedIn(true);
                setFirstName(localStorage.getItem("firstName"));
                const timeOut = exp - now;
                setTimeout(logout, timeOut);
            }
        }
        catch(err){
            logout();
        }
    },[])

    return (
        <AuthContext.Provider value={{  firstName, isLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);