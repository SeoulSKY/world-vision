import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import React from "react";
import {useAuth} from "../../../contexts/AuthContext ";
import {Link} from "react-router-dom";

const {useState} = require("react")


export default function ShowBillingHistory() {

    const [loading, setLoading] = useState(false)
    const [sendingMessageButton, setSendingMessageButton] = useState("Click to view all your transaction history")
    const [error, setError] = useState("")

    const
        messageRef = React.useRef() as React.MutableRefObject<HTMLTextAreaElement>,
        formRef = React.useRef(null);

    const {currentUser} = useAuth()


    async function handleSubmit(e: any) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            fetch('http://localhost:5000/api/transaction?customerUserId=' + currentUser.uid, {method: 'GET'})
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        setError(error)

                        return Promise.reject(error);

                    } else {
                        messageRef.current.value = JSON.stringify(data, null, 2)
                    }


                })
                .catch(error => {

                    if (error === 404) {
                        setError('Invalid customer id')
                    } else {
                        setError("Error getting transactions of customer: " + error)
                    }


                });

        } catch (e) {
            console.log(e)
        }


        setLoading(false)

    }

    return (
        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "80vh"}}>
            <div className="w-100" style={{maxWidth: '700px'}}>
                <Card style={{minHeight: 100}}>
                    <Card.Body>

                        <h1>Billing History</h1>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <br/>

                            <Button disabled={loading} className="w-100" style={{background: "#212529"}}
                                    type="submit"> {sendingMessageButton}</Button>
                            <br/>

                            <br/>
                            <Form.Group id="info">
                                <Form.Control
                                    as="textarea" disabled={true} placeholder="Your transactions will be shown below"
                                    style={{height: '500px', background: "00"}} ref={messageRef} required/>

                            </Form.Group>


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