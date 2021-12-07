import React, {useState} from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"

import { Link, useNavigate } from "react-router-dom"
import {useAuth} from "../../../contexts/AuthContext ";

export default function EditProfileStaff() {
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
        provinceRef = React.useRef() as React.MutableRefObject<HTMLInputElement>





        const { currentUser, updatePasswordCurrentUser, updateEmailCurrentUser, updateStaffInfo } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e:any) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmailCurrentUser(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePasswordCurrentUser(passwordRef.current.value))
        }
        promises.push(updateStaffInfo(firstNameRef.current.value,
            middleNameRef.current.value,
            lastNameRef.current.value,
            buildingNumberRef.current.value,
            streetNumberRef.current.value,
            postalCodeRef.current.value,
            countryRef.current.value,
            cityRef.current.value,
            provinceRef.current.value))

        Promise.all(promises)
            .then(() => {

                navigate('../profile', { replace: true })
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "60vh"}}>
            <div className="w-100" style={{maxWidth: '1000px'}}>
                <Card style={{minHeight: 350}}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile Staff</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    ref={emailRef}
                                    required
                                    defaultValue={currentUser.email}
                                    style={{textAlign: "center"}}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Leave blank to keep the same"
                                    style={{textAlign: "center"}}
                                />
                            </Form.Group>

                            <br/>

                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordConfirmRef}
                                    placeholder="Leave blank to keep the same"
                                    style={{textAlign: "center"}}
                                />
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

                            <h3>Edit Address</h3>
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

                            <Button disabled={loading} style={{background: "#212529"}} className="w-100" type="submit" >
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to="/profile">Cancel</Link>
                </div>

            </div>
        </Container>

    )
}