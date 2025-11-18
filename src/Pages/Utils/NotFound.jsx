import {NavLink} from "react-router-dom";
import logo404 from "../../assets/images/404.png";

let NotFound = () =>{
    return(
        <>
            <section className="section-404 padding-top padding-bottom">
                <div className="container">
                    <div className="thumb-404">
                        <img src={logo404} alt="404"/>
                    </div>
                    <h3 className="title">Oops.. looks like you got lost :( </h3>
                    <NavLink to="/" className="custom-button">Back To Home <i className="flaticon-right"></i></NavLink>
                </div>
            </section>
        </>
    )
}
export default NotFound;