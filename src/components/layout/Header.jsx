import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import {useEffect, useState} from "react";

let Header = () =>{
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return(
        <>

            <header className={`header-section ${isActive ? "header-active" : ""}`}>
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <NavLink as={Link} to="/">
                                <img src={logo} alt="logo"/>
                            </NavLink>
                        </div>
                        <ul className="menu">
                            <li>
                                <NavLink as={Link} to="/home" className="active">Home</NavLink>
                                <ul className="submenu">
                                    <li>
                                        <NavLink as={Link} to="/home" className="active">Home One</NavLink>
                                    </li>
                                    <li>
                                        <NavLink as={Link} to="/home">Home Two</NavLink>
                                    </li>
                                </ul>
                            </li>
                            {/*<li>*/}
                            {/*    <a href="#0">movies</a>*/}
                            {/*    <ul className="submenu">*/}
                            {/*        <li>*/}
                            {/*            <NavLink as={Link} to="movie-grid.html">Movie Grid</NavLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <NavLink as={Link} to="movie-list.html">Movie List</NavLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <NavLink as={Link} to="movie-details.html">Movie Details</NavLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <NavLink as={Link} to="movie-details-2.html">Movie Details 2</NavLink>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <NavLink as={Link} to="movie-ticket-plan.html">Movie Ticket Plan</NavLink>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="#0">sports</a>*/}
                            {/*    <ul className="submenu">*/}
                            {/*        <li>*/}
                            {/*            <a href="sports.html">Sports</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="sport-details.html">Sport Details</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="sports-ticket.html">Sport Ticket</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="sports-checkout.html">Sport Checkout</a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="#0">pages</a>*/}
                            {/*    <ul className="submenu">*/}
                            {/*        <li>*/}
                            {/*            <a href="about.html">About Us</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="apps-download.html">Apps Download</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="sign-in.html">Sign In</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="sign-up.html">Sign Up</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="404.html">404</a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="#0">blog</a>*/}
                            {/*    <ul className="submenu">*/}
                            {/*        <li>*/}
                            {/*            <a href="blog.html">Blog</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="blog-details.html">Blog Single</a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            <li>
                                <Link as={Link} to="contact.html">contact</Link>
                            </li>
                            <li className="header-button pr-0">
                                <Link as={Link} to="/signup">join us</Link>
                            </li>
                        </ul>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;