import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { sendEmailVerification, updateProfile } from 'firebase/auth';

const SignUp = () => {
    const { signUp, fbSignIn } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(name, email, password, confirmPassword);

        if (password !== confirmPassword) {
            alert("pass can't match");
            return;
        };

        signUp(email, password)
            .then(result => {
                console.log(result.user);
                // alert("user created successful");

                updateUserInfo(result.user, name);
                emailVerify(result.user);
            })
            .catch(err => console.log(err.message, alert(err.message)))
    };

    // update user info
    const updateUserInfo = (user, name) => {
        console.log(user)
        updateProfile(user, {
            displayName: name,
        })
            .then(() => console.log())
            .catch(err => console.log(err.message))
    };

    // email verify
    const emailVerify = (user) => {
        sendEmailVerification(user)
            .then(() => alert("Please, check your email for verification"))
            .catch(err => console.log(err.message))
    };

    // sign in with fb
    const handleFbSignIn = () => {
        fbSignIn()
            .then(result => console.log(result.user, alert("user created successful")))
            .catch(err => console.log(err.message, alert(err.message)))
    };

    return (
        <div>
            <form action="" onSubmit={handleSignUp}>
                <input className='input-box' type="text" name="name" placeholder="name" required />
                <input className='input-box' type="email" name="email" placeholder="email" required />
                <input className='input-box' type={show ? "text" : "password"} name="password" placeholder="Password" required />
                <input className='input-box' type={show ? "text" : "password"} name="confirmPassword" placeholder="Password" required />
                <p onClick={() => setShow(!show)} style={{ cursor: "pointer", border: "2px solid gray" }}>
                    {
                        show ? "Hide Password" : "Show password"
                    }
                </p>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <Link to={"/login"} style={{ color: "white", background: "gray", fontSize: "20px" }}>You have an account?</Link>
            </form>

            <small>or</small>
            <br />
            <br />
            <button className='btn-submit' onClick={handleFbSignIn}>Login with facebook</button>
        </div>
    );
};

export default SignUp;