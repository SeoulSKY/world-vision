import React, {useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import {Card, Form, Button, Container, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {useAuth} from "../../../contexts/AuthContext ";

export default function Login() {
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e: any) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value).finally( () => setLoading(false))
            navigate('../', { replace: true })

        } catch {
            setError("Failed to log in")
        }


    }

    return (
        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "70vh"}}>
        <div className="w-100" style={{maxWidth: '1000px'}}>
        <>
            <Card style={{minHeight: 300}}>
                <Card.Body>
                    <h1 className="text-center mb-4">Log In</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} className="w-100" style={{background: "#212529"}} type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/resetPassword">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signUpSelect">Sign Up</Link>
            </div>
        </>
        </div>
        </Container>

    )
}