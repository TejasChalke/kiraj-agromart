import { useContext, useEffect, useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/Contexts';

// const API_KEY = process.env.REACT_APP_API_KEY;

export default function Login() {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://gorest.co.in/public/v2/users")
            if(response.status === 200) setUsers(await response.json());
            else {
                console.log("Error making API request", response.status);
            }
        }
        fetchData();
    }, [])

    function loginUser() {
        if(email === "admin" && password === "admin") {
            navigate("/dashboard");
            return;
        }

        let currentUser = null;
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(user.email === email) {
                currentUser = user;
                break;
            }
        }

        if(currentUser === null) {
            console.log("User not found!");
            return;
        }

        setUser(currentUser);
        navigate("/profile");
    }

    // for loging in as a user please use any of the emails from the console
    // retrieved from the API as, the order in which the API retrieves
    // the data is not known
    console.log(users);

    return(
        <div id="loginContainer">
            <div id="loginForm">
                <div id="title">Orange<span>HRM</span></div>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <div id="buttonContainer">
                    <div
                        className="button"
                        tabIndex={0}
                        onClick={loginUser}
                        onKeyDown={(e) => {if(e.key === "Enter") loginUser()}}
                    >
                    Submit</div>
                </div>
            </div>
        </div>
    )
}