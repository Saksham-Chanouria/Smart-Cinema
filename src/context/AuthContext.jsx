import {createContext,useContext,useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (tk,name)=>{
        localStorage.setItem('token',tk);
        localStorage.setItem('firstName',name);

        setToken(tk);
        setFirstName(name);
        setIsLoggedIn(true);

    };

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');

        setToken(null);
        setFirstName(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ token, firstName, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);