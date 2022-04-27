import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import StaffDashboard from "../StaffDashboard/staffDashboard";
import AboutPage from "../Pages/aboutPage/aboutPage";
import SignupStaff from "../Pages/signUp/SignupStaff";
import {AuthProvider} from "../../contexts/AuthContext ";
import SignUpSelect from "../Pages/signUp/SignUpSelect";
import Login from "../Pages/logIn/Login";
import SignupCustomer from "../Pages/signUp/SignupCustomer";
import Profile from "../Pages/profilePage/profile";
import ResetPassword from "../Pages/resetPassWord/resetPassword";
import CustomerDashboard from "../CustomerDashboard/customerDashboard";
import ContactUsPage from "../Pages/contactUs/contactUsPage";
import EditProfileStaff from "../Pages/editProfile/editProfileStaff";
import EditProfileCustomer from "../Pages/editProfile/editProfileCustomer";
import NavWrapper from "./navWrapper";
import ShowBillingHistory from "../Pages/showBillingHistory/showBillingHistory";
import DeleteAccount from "../Pages/deleteAccount/deleteAccount";
import HeroSection from "../Pages/homePage/HeroSection";
import HomePage from "../Pages/homePage/HomePage";


const NavBar = () => {
    return (

        <AuthProvider>
            <Router>
                <NavWrapper/>

                <div>
                    <Routes>
                        <Route path='/about' element={<AboutPage/>}/>
                        <Route path='/home' element={<HomePage/>}/>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/staffDashboard' element={<StaffDashboard/>}/>
                        <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
                        <Route path='/signUpSelect' element={<SignUpSelect/>}/>
                        <Route path='/signUpStaff' element={<SignupStaff/>}/>


                        <Route path='/signUpCustomer' element={<SignupCustomer/>}/>
                        <Route path='/signIn' element={<Login/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/resetPassword' element={<ResetPassword/>}/>
                        <Route path="/contact-us" element={<ContactUsPage/>}/>


                        <Route path="/editProfileStaff" element={<EditProfileStaff/>}/>
                        <Route path="/editProfileCustomer" element={<EditProfileCustomer/>}/>
                        <Route path="/viewBillingHistory" element={<ShowBillingHistory/>}/>
                        <Route path="/deleteAccount" element={<DeleteAccount/>}/>



                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}
export default NavBar;

