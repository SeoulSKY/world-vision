import React, {useState} from "react"
import {Card, Button, Alert, Container, Form} from "react-bootstrap"

import { useNavigate} from "react-router-dom"



export default function TransactionsButton() {

    const navigate = useNavigate()

    const state = {visible:true}


    async function handleSubmit(e:any) {
        e.preventDefault()

        try {

        } catch {
            alert("Failed to get account type.")
        }

    }



    return (
        <div >
            <br/>
            <Form onSubmit={handleSubmit}>
                <Button className="w-100" style={{background: "#212529"}}
                        type="submit"> {"View Transaction History"}</Button>

            </Form>
        </div>
    )
    }