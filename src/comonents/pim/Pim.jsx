import { useEffect, useState } from 'react'
import './Pim.scss'

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Pim() {
    const [users, setUsers] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Employee List");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://gorest.co.in/public/v2/users")
                if(response.status === 200) setUsers(await response.json());
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

    function resetForm() {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setEmail("");
        setGender("");
    }

    async function addEmployee() {
        const name = firstName + " " + middleName + " " + lastName;
        if(name.trim().length === 0) {
            alert("Name can not be empty!");
            return;
        }

        if(gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female") {
            alert("Enter a valid gender!");
            return;
        }

        if(email.trim().length < 5) {
            alert("Email must conatin atleast 5 characters");
            return;
        }

        const data = {
            name, email, gender, status: "active"
        }

        try {
            const response = await fetch("https://gorest.co.in/public/v2/users", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify(data)
            });

            if(response.status === 201) {
                alert("User created successfully");
                resetForm();
            }
            else {
                alert("Error adding user. Please ensure token is included in env file.");
                console.log("Could not add user", response.status);
            }
        } catch (error) {
            console.log("Error making API request", error);
        }
    }

    return(
        <div id="pimContainer">
            <div id="pimHeader">
                <div className="pimHeaderOption">Configuration</div>
                <div
                    className={`pimHeaderOption cursor` + (selectedTab === "Employee List" ? " active" : "")}
                    onClick={() => setSelectedTab("Employee List")}
                >
                    Employee List
                </div>
                <div 
                    className={`pimHeaderOption cursor` + (selectedTab === "Add Employee" ? " active" : "")}
                    onClick={() => setSelectedTab("Add Employee")}
                >
                    Add Employee
                </div>
                <div className="pimHeaderOption">Reports</div>
            </div>

            {
                selectedTab === "Add Employee" &&
                <div id="addEmployeeForm">
                    <div id="formTitle">Add Employee</div>
                    <div id="formImage">
                        <div id="formIcons">
                            <i className="fa-solid fa-user">
                                <i className="fa-solid fa-plus"></i>
                            </i>
                        </div>
                        <div className="imageText">Accepts .jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px</div>
                    </div>
                    <div id="formInfo">
                        <div className="formInfoContainer">
                            <div className="formInfoTitleContainer">
                                <div className="formInfoTitle">Employee Full Name*</div>
                            </div>
                            <div className="formInfoFieldContainer">
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="formInfoContainer">
                            <div className="formInfoTitleContainer">
                                <div className="formInfoTitle">Email*</div>
                                <div className="formInfoTitle">Gender*</div>
                            </div>
                            <div className="formInfoFieldContainer">
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div id="formButtons">
                        <div id='instruction'>* Required</div>
                        <div className="formButton" onClick={resetForm}>Cancel</div>
                        <div className="formButton invert" onClick={addEmployee}>Save</div>
                    </div>
                </div>
            }
            
            {
                selectedTab === "Employee List" &&
                <div id="employeeList">
                    {
                        users.map((user, index) => {
                            return(
                                <div className="employeeListItem" key={index}>
                                    <div>Name: {user.name}</div>
                                    <div>Email: {user.email}</div>
                                    <div>Gender: {user.gender}</div>
                                    <div style={{color: user.status === "active" ? "green" : "red"}}>Status: {user.status}</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}