import {Link, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import background from "../../assets/images/account/account-bg.jpg"
import { initPageScripts } from "../../assets/js/main.js";
import {showSuccess, showWarning, showError, showServerError,showInputTooltipError} from "../../components/utils/alert.jsx";
import PreLoader from "../../components/layout/PreLoader.jsx";

let Signup = () =>{
    const {register, handleSubmit,watch} = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const gmailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const [conPass, setConPass] = useState(false);

    useEffect(() => {
        initPageScripts();
    }, []);

    const password = watch("password")
    const terms = watch("terms")

    function formSubmit(data) {
        console.log(terms);
        if (!gmailRegex.test(data.email)) {
            showInputTooltipError("Please enter a valid email address.");
            return;
        }
        else if(!conPass){
            showInputTooltipError("Passwords do not match.");
            return;
        }
        else if(!terms){
            showInputTooltipError("Please accept our terms");
            return;
        }
        else
        {
            console.log(data)
            setLoading(true);

            var url = "http://localhost:7011/api/auth/signup";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    if (ans.statusCode == 201) {
                        showSuccess("Account created successfully!");
                        setTimeout(() => {
                            setLoading(false);
                            navigate("/login");
                        }, 600);
                    }

                    else if (ans.statusCode == 400) {
                        setLoading(false);
                        showWarning(data.message);
                    }

                    else if (ans.statusCode == 409) {
                        setLoading(false);
                        showError("Email already exists!");
                    }

                    else if (ans.statusCode == 500) {
                        setLoading(false);
                        showServerError(data.message);
                    }

                    else {
                        setLoading(false);
                        showWarning("Unexpected error occurred");
                    }
                })
        }
    }
    return(
        // ../
        <>
            {loading && <PreLoader />}
            {!loading && (
            <section className="account-section bg_img" style={{ backgroundImage: `url(${background})` }}>
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
                                    <label htmlFor="email1">Email <span>*</span></label>

                                    <input  type="text"  id="email1"  placeholder="Enter Your Email" {...register("email")} />


                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass1">Password<span>*</span></label>
                                    <input type="password" {...register('password')} placeholder="Password" id="pass1" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass2">Confirm Password<span>*</span></label>
                                    <input type="password" {...register("confirmPassword",{required:"Confirm Password is required",validate: value => {
                                            (value===password)?setConPass(true):setConPass(false);
                                        }})} placeholder="Password" id="pass2" required/>
                                </div>
                                <div className={"form-group checkgroup"}>
                                    <input
                                        type="checkbox"
                                        id="terms"{...register("terms")}/>
                                    <label htmlFor="terms">
                                        I agree to the <NavLink as={Link} to="#0">Terms, Privacy Policy</NavLink> and <a href="#0">Fees</a>
                                    </label>
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
            )}
        </>
    )
}

export default Signup;