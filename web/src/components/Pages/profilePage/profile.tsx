import React, {useState} from "react"
import {Card, Button, Alert, Container, Form} from "react-bootstrap"

import { useNavigate} from "react-router-dom"
import {useAuth} from "../../../contexts/AuthContext ";


export default function Profile() {
    const [error, setError] = useState("")
    const {currentUser, currentUserAccountType, logout} = useAuth()
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


    async function handleSubmit(e:any) {
        e.preventDefault()

        try {
            if (currentUserAccountType === "Customer"){
                navigate('../editProfileCustomer', { replace: true })
            }

            if (currentUserAccountType === "Staff"){
                navigate('../editProfileStaff', { replace: true })
            }

        } catch {
            alert("Failed to get account type.")
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
                        <br/>
                        <strong>Account Type:</strong> {currentUserAccountType}
                        {/*<Link to="/updateProfile" style={{background: "#212529"}}*/}
                        {/*      className="btn btn-primary w-100 mt-3">*/}
                        {/*    Update Profile*/}
                        {/*</Link>*/}

                        <br/>
                        <br/>
                        <Form onSubmit={handleSubmit}>
                        <Button className="w-100" style={{background: "#212529"}}
                                type="submit"> {"Update Profile"}</Button>

                        </Form>

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