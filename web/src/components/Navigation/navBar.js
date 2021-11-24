import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import StaffDashboard from "../StaffDashboard/staffDashboard";
import HomePage from "../Pages/homePage/homePage";
import CustomerDashboard from "../CustomerDashboard/customerDashboard";

const NavBar = () => {

    return (
            <Router>
                <>
                    <a href={"home"}> home </a>
                    <a href={"/staffDashboard"}> Staff Dashboard </a>
                    <a href={"/CustomerDashboard"}> Customer Dashboard</a>
                </>
                <div>
                    <Routes>
                        <Route path='/home' element={<HomePage/>}/>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/staffDashboard' element={<StaffDashboard/>}/>
                        <Route path='/customerDashboard' element={<CustomerDashboard/>}/>

                    </Routes>
                </div>
            </Router>
    )
}
export default NavBar;

