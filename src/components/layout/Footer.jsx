import {NavLink,Link} from "react-router-dom";
import logo from "../../assets/images/logo/logo.png"

let Footer = () => {
    return (
        <>
            <footer className="footer-section">
                <div className="newslater-section padding-bottom">
                    <div className="container">
                        <div className="newslater-container bg_img"
                             data-background="assets/images/newslater/newslater-bg01.jpg">
                            <div className="newslater-wrapper">
                                <h5 className="cate">subscribe to Boleto </h5>
                                <h3 className="title">to get exclusive benefits</h3>
                                <form className="newslater-form">
                                    <input type="text" placeholder="Your Email Address"/>
                                    <button type="submit">subscribe</button>
                                </form>
                                <p>We respect your privacy, so we never share your info</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="footer-top">
                        <div className="logo">
                            <NavLink as={Link} to="index-1.html">
                                <img src={logo} alt="footer"/>
                            </NavLink>
                        </div>
                        <ul className="social-icons">
                            <li>
                                <NavLink as={Link} to="">
                                    <i className="fab fa-facebook-f"></i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink as={Link} to="" className="active">
                                    <i className="fab fa-twitter"></i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink as={Link} to="">
                                    <i className="fab fa-pinterest-p"></i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink as={Link} to="#0">
                                    <i className="fab fa-google"></i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink as={Link} to="">
                                    <i className="fab fa-instagram"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-area">
                            <div className="left">
                                <p>Copyright © 2020.All Rights Reserved By <a href="#0">Boleto </a></p>
                            </div>
                            <ul className="links">
                                <li>
                                    <NavLink as={Link} to="#0">About</NavLink>
                                </li>
                                <li>
                                    <NavLink as={Link} to="">Terms Of Use</NavLink>
                                </li>
                                <li>
                                    <NavLink as={Link} to="">Privacy Policy</NavLink>
                                </li>
                                <li>
                                    <NavLink as={Link} to="">FAQ</NavLink>
                                </li>
                                <li>
                                    <NavLink as={Link} to="">Feedback</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer