import React from "react"
import {Button, Form} from "react-bootstrap"

import { useNavigate} from "react-router-dom"



export default function TransactionsButton() {

    const navigate = useNavigate()

    const state = {visible:true}


    async function handleSubmit(e:any) {
        e.preventDefault()

        navigate('../viewBillingHistory', { replace: true })

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