import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'

let Login = () => {
    const {register, handleSubmit} = useForm()
    function formSubmit(data) {
        console.log(data)
    }
    return (
        <>
            <section className="account-section bg_img" data-background="assets/images/account/account-bg.jpg">
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
                                    <input type="checkbox" id="bal2" required/>
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
        </>
    )
}

export default Login