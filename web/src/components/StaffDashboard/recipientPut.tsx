
import React, { useEffect, useState } from 'react';
// import NavBar from './components'

import { useForm } from 'react-hook-form';



const RecipientPut = () => {

    const {register, handleSubmit, reset} = useForm();



    const onSubmitRecipientPut = (dataRecipientPut: any)=> {
        // used to handle post request for recipient account

        // test that we can assess the user posted form data for adding new recipient account
        console.log(dataRecipientPut.recipientUserIdPut)
        resetForm(dataRecipientPut)
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

            <h2>Edit Recipient Account</h2>
            <p>Enter recipient Id and any information to modify</p>

            <form onSubmit={handleSubmit(onSubmitRecipientPut)}>
                <input type ="text" placeholder="userId" {...register("userId") } required />
                <br/>
                <br/>
                <input type ="text" placeholder="firstName" {...register("firstName")} />
                <input type ="text" placeholder="middleName" {...register("middleName")} />
                <input type ="text" placeholder="lastName" {...register("lastName")} />
                <input type ="text" placeholder="gender" {...register("gender")} />
                <p>Birthdate</p>
                <input type="date" id="start" {...register("recipientBirthDatePut")} />
                <br/>
                <br/>

                <input type ="text" placeholder="buildingNumber" {...register("buildingNumber")} />
                <input type ="text" placeholder="street" {...register("street")} />
                <input type ="text" placeholder="city" {...register("city")}  />
                <input type ="text" placeholder="province" {...register("province")} />
                <input type ="text" placeholder="postalCode" {...register("postalCode")} />
                <input type ="text" placeholder="country" {...register("country")}  />
                <br/>

                <br/>
                <textarea rows={10} cols={100}  placeholder='Description' {...register("recipientDescriptionPut")}  />

                <br/>
                <br/>
                <input type="submit" />
            </form>

            <br/>
            <br/>





        </div>
    )


}


export default RecipientPut;
