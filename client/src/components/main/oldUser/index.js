import { useState } from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import "./index.css";

import { checkUser, getUserData } from "../../../services/loginService";

const OldUser = ({handleLoggedin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const isValidLogin = () => {
        let isValid = true;
        setUsernameErr('');
        setPasswordErr('');

        if (username.length < 5 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setUsernameErr("Username should only contain letters or numbers and be at least 5 characters long.");
            isValid = false;
        }

        if (password.length < 8) {
            setPasswordErr("Password should be at least 8 characters.");
            isValid = false;
        }

        return isValid;
    };

    const handleLoginClick = async () => {
        if (isValidLogin()) {
            try {
                const res = await checkUser({ username, password });
                console.log('Logged in successfully, welcome: ', res.username);
                try {
                    const userData = await getUserData(username);
                    handleLoggedin(userData.username, userData.useremail, userData.createdDate);
                } catch (userDataErr) {
                    console.error("Error in userData", userDataErr.message);
                    setUsernameErr('Error in getting user data');
                    setPasswordErr('');
                }
            } catch (loginErr) {
                console.error("Error in login", loginErr.message);
                setUsernameErr('Username or password incorrect.');
                setPasswordErr('Username or password incorrect.');
            }
        }
    };

    return (
        <Form>
            <Input
                title="Username"
                id="oldUserInput"
                val={username}
                setState={setUsername}
                err={usernameErr}
            />
            <Input
                title="Password"
                id="oldUserPassword"
                val={password}
                setState={setPassword}
                err={passwordErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={handleLoginClick}
                >
                    Log in
                </button>
            </div>
        </Form>
    );
}

export default OldUser;
