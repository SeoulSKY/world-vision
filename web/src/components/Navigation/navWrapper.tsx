import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext ";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";


export default function NavWrapper() {

    const {currentUser, currentUserAccountType} = useAuth();

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to={"/home"}>World Vision</Navbar.Brand>
                    <Nav className="me-auto">
                        {currentUserAccountType === "Staff" && <Nav.Link as={Link} to={"/staffDashboard"}>Staff Dashboard</Nav.Link>}
                        {currentUserAccountType === "Customer" && <Nav.Link as={Link} to={"/customerDashboard"}>Customer Dashboard</Nav.Link>}
                    </Nav>

                    <Nav>
                        {currentUser === null && <Nav.Link as={Link} to={"/signIn"}>Sign In</Nav.Link>}
                        {currentUser === null && <Nav.Link as={Link} to={"/signUpSelect"}>Sign Up</Nav.Link>}
                        {currentUser !== null && <Nav.Link as={Link} to={"/profile"}>{"Profile"}</Nav.Link>}
                        <Nav.Link as={Link} to={"/contact-us"}>Contact Us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}