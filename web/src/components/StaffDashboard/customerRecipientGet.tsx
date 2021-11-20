
import React, { useEffect, useState } from 'react';


import { useForm } from 'react-hook-form';



const CustomerRecipientGet = () => {

    const {register, handleSubmit, reset} = useForm();


    const onSubmitCustomerGet = (dataCustomerGet: any)=> {
        // used to handle put request for staff account

        // test that we can assess the user posted form data put request of staff account
        console.log(dataCustomerGet.customerUserIdGet)
        resetForm(dataCustomerGet)

    }


    function resetForm(data: any) {

        console.log(data)
        // reset return info
        for (var key in data) {
            data[key] =""
        }
        reset({});

    }



    return (



        <div>

            <br/>
            <br/>
            <h2>Get Customer Account's Recipients</h2>
            <p>Enter ID of Customer Account to get the Customer's recipients.
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerGet)}>
                <input type ="text" placeholder="userId" {...register("customerUserIdGet") } required />
                <br/>
                <br/>
                <textarea readOnly = {true} rows={10} cols={100}  placeholder="Customer's recipients will be shown here" {...register("customerUserDisplayRecipients")} />
                <br/>
                <br/>
                <input type="submit" />
            </form>
            <br/>
            <br/>


        </div>
    )


}


export default CustomerRecipientGet;
