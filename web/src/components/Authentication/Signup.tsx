import React, {useRef, Component, useState} from 'react';
import {Card, Form, Button, Container, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {AuthProvider, useAuth} from "../../contexts/AuthContext ";

export default function Signup() {
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordConfirmRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e: any) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)

        } catch (e){
            console.log(e)
            setError("Failed to create an account")
        }

        setLoading(false)
    }
    return (
        <AuthProvider>
            <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "80vh"}}>
                <div className="w-100" style={{maxWidth: '1000px'}}>
                    <>
                        <Card style={{minHeight: 500}}>
                            <Card.Body>

                                {error && <Alert variant="danger" >{error}</Alert>}
                                <br/>
                                <h2 className="text-center mb-20">Sign Up</h2>
                                <Form onSubmit={handleSubmit}>
                                    <br/>
                                    <Form.Group id="email">
                                        <Form.Label> Email</Form.Label>
                                        <Form.Control type="email" ref={emailRef} required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group id="password">
                                        <Form.Label> Password</Form.Label>
                                        <Form.Control type="password" ref={passwordRef} required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group id="password-confirm">
                                        <Form.Label> Password Confirmation</Form.Label>
                                        <Form.Control type="password" ref={passwordConfirmRef} required/>
                                    </Form.Group>

                                    <br/>
                                    <Button disabled={loading} className="w-100" style={{background: "#212529"}} type="submit"> Sign
                                        Up </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Already have an account ? Log In
                        </div>
                    </>
                </div>
            </Container>
        </AuthProvider>

    )
}