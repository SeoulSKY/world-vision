import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import {Nav} from "react-bootstrap";

const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">World Vision</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Staff Dashboard</Nav.Link>
                        <Nav.Link href="#features">Customer Dashboard</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/sign-in">Sign In</Nav.Link>
                        <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
        )
    }
    export default NavBar;

