import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import React from "react";
import {useAuth} from "../../../contexts/AuthContext ";
import {Link, useNavigate} from "react-router-dom";

const {useState} = require("react")


export default function DeleteAccount() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const {deleteAccount} = useAuth()

    const textRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate()


    async function handleSubmit(e: any) {
        e.preventDefault()

        if (textRef.current.value =="DELETE ACCOUNT") {

            try {
                setError("")
                setLoading(true)

                deleteAccount()


            } catch (e) {
                setError(e)
                console.log(e)
            }


        }

        else {
            setError("Please enter DELETE ACCOUNT to confirm deletion of account")
        }

        setLoading(false)
        navigate('../', { replace: true })

    }

    return (
        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "50vh"}}>
            <div className="w-100" style={{maxWidth: '700px'}}>
                <Card style={{minHeight: 100}}>
                    <Card.Body>

                        <h1>Delete Account</h1>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <br/>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="instructions">
                                <Form.Label>Confirm that you want to delete your account</Form.Label>
                                <br/>
                                <Form.Control type="text" placeholder = "Please type DELETE ACCOUNT to delete your account  "  style={{textAlign: "center"}} ref={textRef} required />
                            </Form.Group>

                            <br/>

                            <Button disabled={loading} className="w-100" style={{background: "#212529"}}
                                    type="submit"> Submit </Button>
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