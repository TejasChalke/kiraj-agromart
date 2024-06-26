import { useNavigate } from 'react-router-dom';
import './AdminDashboard.scss'
import { useState } from "react"
import Pim from '../pim/Pim';

export default function AdminDashboard() {
    const [sidebarSelection, setSidebarSelection] = useState("PIM");
    const [showDropDown, setShowDropDown] = useState(false);
    const navigate = useNavigate();

    function toggleDropDown() {
        setShowDropDown(prev => !prev);
    }

    function logoutUser() {
        navigate("/");
    }

    let DisplayComponent = Pim;
    switch(setSidebarSelection) {
        case "PIM":
            DisplayComponent = Pim;
            break;
        default:
            break;
    }

    return(
        <div id="dashboardContainer">
            <div id="sidebar">
                <div id="sidebarTitle">
                    Orange<span>HRM</span>
                </div>
                <div className="listItem search">
                    <i className="fa-solid fa-search"></i>
                    <input type="text" placeholder='Search' />
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-user-tie"></i>
                    <div>Admin</div>
                </div>
                <div
                    className={`listItem cursor` + (sidebarSelection === "PIM" ? " active" : "")}
                    onClick={() => setSidebarSelection("PIM")}
                >
                    <i className="fa-solid fa-users-line"></i>
                    <div>PIM</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-business-time"></i>
                    <div>Leave</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-clock"></i>
                    <div>Time</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-circle-info"></i>
                    <div>MyInfo</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-house"></i>
                    <div>Dashboard</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-address-book"></i>
                    <div>Directory</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-screwdriver-wrench"></i>
                    <div>Maintenance</div>
                </div>
                <div className="listItem">
                    <i className="fa-solid fa-bullhorn"></i>
                    <div>Buzz</div>
                </div>
            </div>
            <div id="mainboard">
                <div id="mainHeader">
                    <div id="mainTitle">Title</div>
                    <div id="mainDropDownContainer">
                        <div className="iconContainer">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>Admin</div>
                        {
                            showDropDown ?
                            <i className="fa-solid fa-chevron-up" onClick={toggleDropDown}></i> :
                            <i className="fa-solid fa-chevron-down" onClick={toggleDropDown}></i>
                        }
                        <div id="mainDropDownList" className={showDropDown ? "active" : ""}>
                            <div className="dropDownItem" onClick={logoutUser}>Logout</div>
                        </div>
                    </div>
                </div>
                <DisplayComponent />
            </div>
        </div>
    )
}