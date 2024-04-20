import { useState } from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import "./index.css";
import { addUser, checkUsername, checkUseremail } from "../../../services/signupService";

const NewUser = ({handleLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [useremail, setUseremail] = useState("")
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [userEmailErr, setUserEmailErr] = useState('')

    const isValidNewUser = () => {
        let isValid = true;
        setUsernameErr('');
        setPasswordErr('');
        setUserEmailErr('');

        if (username.length < 5 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setUsernameErr("Username should only contain letters or numbers and be at least 5 characters long.");
            isValid = false;
        }

        if (password.length < 8) {
            setPasswordErr("Password should be at least 8 characters.");
            isValid = false;
        }

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(useremail)) {
            setUserEmailErr("Invalid email format.");
            isValid = false;
        }

        if (!useremail) {
            setUserEmailErr("Email cannot be empty")
            isValid = false;
        }


        return isValid;
    };

    const handleSignupClick = async () => {
        if (isValidNewUser()) {
            let preventSignup = false;

            const usernameStatus = await checkUsername(username);
            const useremailStatus = await checkUseremail(useremail);

            if(usernameStatus === true) {
                preventSignup = true;
                setUsernameErr("Username already exists.");
            }

            if (useremailStatus === true) {
                preventSignup = true;
                setUserEmailErr("Email is already taken");
            }

            if(usernameStatus === true && useremailStatus === true) {
                setUsernameErr("Username and email both exist, you may already registered.");
                setUserEmailErr("Username and email both exist, you may already registered.");
            }

            if (preventSignup) {
                return;
            }

            try {
                const user = await addUser({ username, password, useremail });
                console.log('User registered successfully, welcome! ', user.username, user.createdDate);
                handleLoggedIn(username, useremail, user.createdDate);
            } catch (error) {
                console.error("An unknown error occurred", error.message || "Unknown");
            }
        }
    };

    return (
        <Form>
            <Input
                title="Username"
                hint="Create your username, it should only contain letters or numbers with length longer than 5"
                id="newUserInput"
                val={username}
                setState={setUsername}
                err={usernameErr}
            />
            <Input
                title="Password"
                hint="Create your password, it should be longer than 8 characters"
                id="newUserPassword"
                val={password}
                setState={setPassword}
                err={passwordErr}
            />
            <Input
                title="Email"
                hint="Enter your email"
                id = "newUserEmail"
                val ={useremail}
                setState={setUseremail}
                err = {userEmailErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        handleSignupClick();
                    }}
                >
                    Sign Up
                </button>
            </div>
        </Form>
    );
};

export default NewUser;