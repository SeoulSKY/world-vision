import React from "react"
import {Button, Form} from "react-bootstrap"

import { useNavigate} from "react-router-dom"



export default function DeleteAccountButton() {

    const navigate = useNavigate()

    async function handleSubmit(e:any) {
        e.preventDefault()

        navigate('../deleteAccount', { replace: true })

    }

    return (
        <div >
            <br/>
            <Form onSubmit={handleSubmit}>
                <Button className="w-100" style={{background: "#212529"}}
                        type="submit"> {"Delete Account"}</Button>

            </Form>
        </div>
    )
    }