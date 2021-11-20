// @ts-ignore
// error with router dom
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import {Nav} from "react-bootstrap";


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import StaffDashboard from "../StaffDashboard/staffDashboard";
import HomePage from "../Pages/homePage";


const NavBar = () => {
    return (
        <Router>
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to = {"/home"}>World Vision</Navbar.Brand>
                        <Nav className="me-auto">

                            <Nav.Link as={Link} to = {"/staffDashboard"} >Staff Dashboard</Nav.Link>
                            <Nav.Link as={Link} to = {"/customerDashboard"} >Customer Dashboard</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to = {"/signIn"} >Sign In</Nav.Link>
                            <Nav.Link as={Link} to = {"/signUp"} >Sign Up</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
            <div>
                <Routes>
                    {/*<Route path="/staffDashboard">*/}
                    {/*    <StaffDashboard/>*/}
                    {/*</Route>*/}

                    {/*<Route path="/home">*/}
                    {/*    <HomePage />*/}
                    {/*</Route>*/}
                </Routes>
            </div>
        </Router>
    )
}
export default NavBar;

