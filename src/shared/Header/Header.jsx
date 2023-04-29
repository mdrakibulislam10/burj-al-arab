import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => alert("Log out successful"))
    };

    return (
        <header>
            <nav className='header'>
                <Link to={"/"}>Home</Link>
                <Link to={"/book"}>book</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/sign-up"}>Sign Up</Link>
                {
                    user &&
                    <>
                        <p>{user.email}</p>
                        <button onClick={handleLogOut}>Log Out</button>
                    </>
                }
            </nav>

            <div>
                <h1>Burj Al Arab</h1>
                <h3>A Global Icon Of Arabian Luxury</h3>
            </div>

            <hr />
        </header>
    );
};

export default Header;