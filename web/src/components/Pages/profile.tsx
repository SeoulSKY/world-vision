import React, {useState} from "react"
import {Card, Button, Alert, Container} from "react-bootstrap"

import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext ";

export default function Profile() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate('../signIn', {replace: true})
        } catch {
            setError("Failed to log out")
        }
    }

    return (

        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "60vh"}}>
            <div className="w-100" style={{maxWidth: '1000px'}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email:</strong> {currentUser && currentUser.email}
                        <Link to="/updateProfile" style={{background: "#212529"}}
                              className="btn btn-primary w-100 mt-3">
                            Update Profile
                        </Link>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>
                        Log Out
                    </Button>
                </div>
            </div>
        </Container>
    )
}