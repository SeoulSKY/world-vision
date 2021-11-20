
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

const RecipientGet = () => {

    const {register, handleSubmit, reset} = useForm();



    const onSubmitRecipientGet = (dataRecipientGet: any)=> {
        // used to handle put request for staff account

        // test that we can assess the user posted form data put request of staff account
        console.log(dataRecipientGet.recipientUserIdGet)
        resetForm(dataRecipientGet)

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
            <h2>Get Recipient Account</h2>
            <p>Enter ID of Recipient Account to get Recipient information. If no Id is given all recipients will be displayed
            </p>

            <form onSubmit={handleSubmit(onSubmitRecipientGet)}>
                <input type ="text" placeholder="userId" {...register("userId") } />
                <br/>
                <br/>
                <textarea readOnly = {true} rows={10} cols={100}  placeholder='Recipient info will be shown here' {...register("recipientUserDisplay")} />
                <br/>
                <br/>
                <input type="submit" />
            </form>
            <br/>
            <br/>


        </div>
    )


}


export default RecipientGet;
