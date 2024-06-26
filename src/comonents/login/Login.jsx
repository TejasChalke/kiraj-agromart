import { useContext, useEffect, useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/Contexts';

export default function Login() {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://gorest.co.in/public/v2/users")
                if(response.status === 200) {
                    setUsers(await response.json());
                    alert("Check console for login emails. (Press F12 or Fn + F12)");
                }
                else {
                    alert("Couldn't get user data.");
                    console.log("Could not get user data", response.status);
                }    
            } catch (error) {
                console.log("Error making API request", error)
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
            alert("User not found!");
            return;
        }

        setUser(currentUser);
        navigate("/profile");
    }

    // for loging in as a user please use any of the emails from the console
    // retrieved from the API as, the order in which the API retrieves
    // the data is not known
    users.forEach(user => console.log(user.email));

    return(
        <div id="loginContainer">
            <div id="loginForm">
                <div id="title">Orange<span>HRM</span></div>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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