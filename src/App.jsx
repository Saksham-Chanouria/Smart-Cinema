import {BrowserRouter,Routes,Route} from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import Home from "./components/Home/Home.jsx";


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
                    <Route path={"login"}></Route>
                    <Route path={"signup"}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
