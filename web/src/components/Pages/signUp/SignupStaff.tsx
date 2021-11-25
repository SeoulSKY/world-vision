import React, {useState} from 'react';
import {Card, Form, Button, Container, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

import {Link, useNavigate} from "react-router-dom";
import {AuthProvider, useAuth} from "../../../contexts/AuthContext ";

export default function SignupStaff() {
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        passwordConfirmRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        firstNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        middleNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        lastNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        buildingNumberRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        streetNumberRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        postalCodeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        countryRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        cityRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        provinceRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,

        {signupStaff} = useAuth(), [error, setError] = useState(""), [loading, setLoading] = useState(false),
        navigate = useNavigate();


    async function handleSubmit(e: any) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signupStaff(emailRef.current.value,
                passwordRef.current.value,
                firstNameRef.current.value,
                middleNameRef.current.value,
                lastNameRef.current.value,
                buildingNumberRef.current.value,
                streetNumberRef.current.value,
                postalCodeRef.current.value,
                countryRef.current.value,
                cityRef.current.value,
                provinceRef.current.value).finally( () => setLoading(false))

            navigate('../staffDashboard', {replace: true})
            window.location.reload();


        } catch (e) {
            console.log(e)
            setError("Failed to create an account")
        }


    }

    return (
        <AuthProvider>
            <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "80vh"}}>
                <div className="w-100" style={{maxWidth: '1000px'}}>
                    <>
                        <Card style={{minHeight: 1100}}>
                            <Card.Body>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <br/>
                                <h1 className="text-center mb-20">Sign Up Staff</h1>
                                <Form onSubmit={handleSubmit}>
                                    <br/>
                                    <Form.Group id="email">
                                        <Form.Label> Email</Form.Label>
                                        <Form.Control type="email" style={{textAlign: "center"}} ref={emailRef}
                                                      required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group id="password">
                                        <Form.Label> Password</Form.Label>
                                        <Form.Control type="password" style={{textAlign: "center"}} ref={passwordRef}
                                                      required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group id="password-confirm">
                                        <Form.Label> Password Confirmation</Form.Label>
                                        <Form.Control type="password" style={{textAlign: "center"}}
                                                      ref={passwordConfirmRef} required/>
                                    </Form.Group>

                                    <br/>

                                    <Form.Group id="firstName">
                                        <Form.Label> First Name</Form.Label>
                                        <Form.Control type="text" style={{textAlign: "center"}} ref={firstNameRef}
                                                      required/>
                                    </Form.Group>

                                    <br/>

                                    <Form.Group id="middleName">
                                        <Form.Label> Middle Name</Form.Label>
                                        <Form.Control type="text" placeholder="Middle name is optional"
                                                      style={{textAlign: "center"}} ref={middleNameRef}/>
                                    </Form.Group>

                                    <br/>


                                    <Form.Group id="lastName">
                                        <Form.Label> Last Name</Form.Label>
                                        <Form.Control type="text" style={{textAlign: "center"}} ref={lastNameRef}
                                                      required/>
                                    </Form.Group>

                                    <br/>
                                    <br/>

                                    <h3>Enter Address</h3>
                                    <br/>

                                    <Form.Group id="buildingNumber">
                                        <Form.Control type="text" placeholder="Building number"
                                                      style={{textAlign: "center"}} ref={buildingNumberRef} required/>
                                    </Form.Group>

                                    <br/>

                                    <br/>

                                    <Form.Group id="street">
                                        <Form.Control type="text" placeholder="Street" style={{textAlign: "center"}}
                                                      ref={streetNumberRef} required/>
                                    </Form.Group>

                                    <br/>

                                    <Form.Group id="city">
                                        <Form.Control type="text" placeholder="City" style={{textAlign: "center"}}
                                                      ref={cityRef} required/>
                                    </Form.Group>

                                    <br/>

                                    <Form.Group id="province">
                                        <Form.Control type="text" placeholder="Province" style={{textAlign: "center"}}
                                                      ref={provinceRef} required/>
                                    </Form.Group>

                                    <br/>

                                    <Form.Group id="postalCode">
                                        <Form.Control type="text" placeholder="Postal Code" style={{textAlign: "center"}}
                                                      ref={postalCodeRef} required/>
                                    </Form.Group>

                                    <br/>

                                    <Form.Group id="country">
                                        <Form.Control type="text" placeholder="Country" style={{textAlign: "center"}}
                                                      ref={countryRef} required/>
                                    </Form.Group>

                                    <br/>


                                    <Button disabled={loading} className="w-100" style={{background: "#212529"}}
                                            type="submit"> Sign
                                        Up </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Already have an account ? <Link to="/signIn">Log In</Link>
                        </div>
                        <br/>

                        <br/>

                    </>
                </div>
            </Container>
        </AuthProvider>

    )
}