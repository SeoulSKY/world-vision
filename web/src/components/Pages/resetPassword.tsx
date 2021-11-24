import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"

import { Link } from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext ";

export default function ResetPassword() {
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e:any) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for password reset instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (

        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "60vh"}}>
        <div className="w-100" style={{maxWidth: '1000px'}}>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} style={{background: "#212529"}} className="w-100" type="submit" >
                            Reset Password
                        </Button>
                        <br/>
                        <br/>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to="/signIn">Log In</Link>
            </div>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signUpSelect">Sign Up</Link>
            </div>

            </div>
        </Container>
    )
}
