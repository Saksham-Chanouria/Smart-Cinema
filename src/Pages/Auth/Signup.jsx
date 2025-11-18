import {Link, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

let Signup = () =>{
    const {register, handleSubmit} = useForm();

    function formSubmit(data) {
        console.log(data)

        var url = "http://localhost:7011/api/auth/signup";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(ans => {
                console.log(ans);
            })
    }
    return(
        <>
            <section className="account-section bg_img" data-background="assets/images/account/account-bg.jpg">
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">Welcome To</span>
                                <h2 className="title">to Boleto </h2>
                            </div>
                            <form onSubmit={handleSubmit(formSubmit)} className="account-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name<span>*</span></label>
                                    <input type="text" {...register('fullName')} placeholder="Enter Your Full Name" id="fullName" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email1">Email<span>*</span></label>
                                    <input type="text" {...register('email')} placeholder="Enter Your Email" id="email1" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass1">Password<span>*</span></label>
                                    <input type="password" {...register('password')} placeholder="Password" id="pass1" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass2">Confirm Password<span>*</span></label>
                                    <input type="password" placeholder="Password" id="pass2" required/>
                                </div>
                                <div className="form-group checkgroup">
                                    <input {...register('T&C')} type="checkbox" id="bal"/>
                                    <label htmlFor="bal">I agree to the <NavLink as={Link} to="#0">Terms, Privacy Policy</NavLink> and <a
                                        href="#0">Fees</a></label>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="Sign Up"/>
                                </div>
                            </form>
                            <div className="option">
                                Already have an account? <Link as={Link} to="/login">Login</Link>
                            </div>
                            <div className="or"><span>Or</span></div>
                            <ul className="social-icons">
                                <li>
                                    <a href="#0">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#0" className="active">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#0">
                                        <i className="fab fa-google"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;