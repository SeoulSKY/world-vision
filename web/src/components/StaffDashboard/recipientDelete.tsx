
import React, { useEffect, useState } from 'react';


import { useForm } from 'react-hook-form';



const RecipientDelete = () => {

    const {register, handleSubmit, reset} = useForm();



    const onSubmitRecipientDelete = (dataRecipientDelete: any)=> {
        // used to handle put request for staff account

        // test that we can assess the user posted form data put request of staff account
        resetForm(dataRecipientDelete)

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

            <h2>Delete Recipient Account</h2>
            <p>Enter ID of Recipient Account to delete
            </p>

            <form onSubmit={handleSubmit(onSubmitRecipientDelete)}>
                <input type ="text" placeholder="userId" {...register("userId") } required />
                <input type="submit" />
            </form>


            <br/>
            <br/>





        </div>
    )


}


export default RecipientDelete;
