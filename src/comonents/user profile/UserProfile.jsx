import './UserProfile.scss'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/Contexts"
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if(user.name === undefined || user.name === null) {
            navigate("/");
        }
    }, [navigate, user])

    function toggleDropDown() {
        setShowDropDown(prev => !prev);
    }

    function logoutUser() {
        setUser({});
        navigate("/");
    }

    const name = user?.name.split(" ");

    return(
        <div id="profileContainer">
            <div id="header">
                <div id="title">Orange<span>HRM</span></div>
                <div id="dropDownContainer">
                    <div className="iconContainer">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div>{user?.name}</div>
                    {
                        showDropDown ?
                        <i className="fa-solid fa-chevron-up" onClick={toggleDropDown}></i> :
                        <i className="fa-solid fa-chevron-down" onClick={toggleDropDown}></i>
                    }
                    <div id="dropDownList" className={showDropDown ? "active" : ""}>
                        <div className="dropDownItem" onClick={logoutUser}>Logout</div>
                    </div>
                </div>
            </div>
            <div id="profileDisplay">
                <div id="profileTitle">Your Details</div>
                <div id="profileImage">
                    <div id="profileIcons">
                        <i className="fa-solid fa-user">
                            <i className="fa-solid fa-plus"></i>
                        </i>
                    </div>
                    <div className="imageText">Accepts .jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px</div>
                </div>
                <div id="profileInfo">
                    <div className="profileInfoContainer">
                        <div className="profileInfoTitleContainer">
                            <div className="profileInfoTitle">Employee Full Name</div>
                        </div>
                        <div className="profileInfoFieldContainer">
                            <div className="profileInfoField">{name[0]}</div>
                            <div className="profileInfoField">{name.length > 2 ? name[1] : ""}</div>
                            <div className="profileInfoField">{name.length > 2 ? name[2] : name[1]}</div>
                        </div>
                    </div>
                    <div className="profileInfoContainer">
                        <div className="profileInfoTitleContainer">
                            <div className="profileInfoTitle">Employee ID</div>
                            <div className="profileInfoTitle">Gender</div>
                        </div>
                        <div className="profileInfoFieldContainer">
                            <div className="profileInfoField">{user.id}</div>
                            <div className="profileInfoField">{user.gender}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}