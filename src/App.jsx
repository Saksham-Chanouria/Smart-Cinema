import {BrowserRouter,Routes,Route} from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import Home from "./components/Home/Home.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Login from "./Pages/Auth/Login.jsx";
import NotFound from "./Pages/Utils/NotFound.jsx";
import PreLoader from "./components/layout/PreLoader.jsx";
import RedirectToHome from "./components/layout/RedirectToHome.jsx";



function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path={"home"} element={<Home/>}></Route>
                </Route>

                <Route path="/">
                    <Route path={"login"} element={<RedirectToHome><Login/></RedirectToHome>}></Route>
                    <Route path={"signup"} element={<RedirectToHome><Signup/></RedirectToHome>}></Route>
                </Route>

                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
