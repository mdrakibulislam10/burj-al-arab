import React, { useContext, useRef, useState } from 'react';
import "./Login.css";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { signIn, resetPass } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const emailRef = useRef();

    const [show, setShow] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleSignIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                alert("user login successful")
                // redirect
                navigate(from, { replace: true });
            })
            .catch(err => console.log(err.message, alert(err.message)))
    };

    // reset pass
    const resetPassHandler = () => {
        // console.log(emailRef.current.value);
        const email = emailRef.current.value;
        resetPass(email)
            .then(() => alert("Please, check your email"))
            .catch(err => console.log(err.message, alert(err.message)))
    };

    return (
        <div>
            <form action="" onSubmit={handleSignIn}>
                <input className='input-box' ref={emailRef} type="email" name="email" placeholder="email" required />
                <input className='input-box' type={show ? "text" : "password"} name="password" placeholder="Password" required />
                <p onClick={() => setShow(!show)} style={{ cursor: "pointer", border: "2px solid gray" }}>
                    {
                        show ? "Hide Password" : "Show password"
                    }
                </p>
                <input className='btn-submit' type="submit" value="Login" />
                <Link to={"/sign-up"} style={{ color: "white", background: "gray", fontSize: "20px" }}>New to burj al arab?</Link>
            </form>

            <button onClick={resetPassHandler}>forgot password?</button>
            <br />
            <br />
            <button className='btn-submit'>Login with facebook</button>
        </div>
    );
};

export default Login;