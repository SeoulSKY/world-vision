import React, { useState} from 'react';
import {Card, Form, Button, Container, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate} from "react-router-dom";


export default function SignUpSelect() {
    const secretRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(false)

        if (secretRef.current.value === "cmpt353") {
            navigate('../signUpStaff', { replace: true })

        }


        if (secretRef.current.value === "") {
            navigate('../signUpCustomer', { replace: true })
        }

        else {

            return setError("Incorrect secret code")

           }




    }


    return (

        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "60vh"}}>
            <div className="w-100" style={{maxWidth: '1000px'}}>
                    <Card style={{minHeight: 300}}>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <br/>
                            <h1 className="text-center mb-20">Sign Up Selection</h1>
                            <Form onSubmit={handleSubmit}>
                                <br/>

                                <Form.Group id="signUpSelect">
                                    <Form.Label> Are you a staff member?</Form.Label>
                                    <Form.Control type="text" placeholder= "If you are a staff member enter the secret key. Otherwise enter nothing to signup as customer"  style={{textAlign: "center"}} ref={secretRef}/>
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
            </div>
        </Container>


    )
}