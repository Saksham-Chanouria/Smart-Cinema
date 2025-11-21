import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import background from "../../assets/images/account/account-bg.jpg"
import {useState} from "react";
import PreLoader from "../../components/layout/PreLoader.jsx";
import {showWarning,showError,showServerError,showInputTooltipError} from "../../components/utils/alert.jsx";



let Login = () => {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate();
    const gmailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;


    var [loading, setLoading] = useState(false);

    function formSubmit(data) {
        if (!gmailRegex.test(data.email)) {
            showInputTooltipError("Please enter a valid email address.");
            return;
        }
        else {
            console.log(data)
            setLoading(true);       // Show preloader
            var url = "http://localhost:7011/api/auth/login";


            fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.statusCode === 200) {
                        console.log("Login success");
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("firstName", data.firstName);
                        setTimeout(() => {
                            setLoading(false);
                            navigate("/home");
                        }, 600)
                    } else if (data.statusCode === 401) {
                        setLoading(false);
                        console.log("Invalid Username or Password");
                        showError(data.message);
                    } else if (data.statusCode === 400) {
                        setLoading(false);
                        console.log("Invalid Request:", data.message);
                        showWarning(data.message);
                    } else if (data.statusCode === 500) {
                        setLoading(false);
                        console.log("Server Error:", data.message);
                        showServerError(data.message);
                    } else {
                        setLoading(false);
                        console.log("Unhandled response", data);
                        showWarning(data.message);
                    }
                })
                .catch(err => {
                    // This handles OFFLINE server or NO RESPONSE
                    setLoading(false);
                    console.error("Network Error:", err);
                    showServerError("Unable to connect to the server. Please try again!");
                });
        }
    }
    return (
        <>
            {loading && <PreLoader/>}
            {!loading && (
                <section className="account-section bg_img" style={{ backgroundImage: `url(${background})` }}>
                    <div className="container">
                        <div className="padding-top padding-bottom">
                            <div className="account-area">
                                <div className="section-header-3">
                                    <span className="cate">hello</span>
                                    <h2 className="title">welcome back</h2>
                                </div>
                                <form className="account-form" onSubmit={handleSubmit(formSubmit)}>
                                    <div className="form-group">
                                        <label htmlFor="email2">Email<span>*</span></label>
                                        <input type="text" {...register('email')} placeholder="Enter Your Email" id="email2" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass3">Password<span>*</span></label>
                                        <input type="password" {...register('password')} placeholder="Password" id="pass3" required/>
                                    </div>
                                    <div className="form-group checkgroup">
                                        <input type="checkbox" id="bal2"/>
                                        <label htmlFor="bal2">remember password</label>
                                        <a href="#0" className="forget-pass">Forget Password</a>
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="submit" value="log in"/>
                                    </div>
                                </form>
                                <div className="option">
                                    Don't have an account? <Link as={Link} to="/signup">sign up now</Link>
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

export default Login