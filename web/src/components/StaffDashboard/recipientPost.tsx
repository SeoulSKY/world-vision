
import React, { useEffect, useState } from 'react';
// import NavBar from './components'

import { useForm } from 'react-hook-form';



const RecipientPost = () => {

    const {register, handleSubmit, reset} = useForm();



    const onSubmitRecipientPost = (dataRecipientPost: any)=> {
        // used to handle post request for recipient account

        // test that we can assess the user posted form data for adding new recipient account
        console.log(dataRecipientPost.recipientUserIdPost + " " + dataRecipientPost.recipientFirstNamePost + " " +dataRecipientPost.recipientCountryPost + " " + dataRecipientPost.recipientBirthDatePost+ " " + dataRecipientPost.recipientDescriptionPost)
        resetForm(dataRecipientPost)
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

            <h2>Create New Recipient Account</h2>
            <p>Enter recipient personal details</p>

            <form onSubmit={handleSubmit(onSubmitRecipientPost)}>
                <input type ="text" placeholder="userId" {...register("userId") } required />
                <input type ="text" placeholder="firstName" {...register("firstName")} required/>
                <input type ="text" placeholder="middleName" {...register("middleName")} required/>
                <input type ="text" placeholder="lastName" {...register("lastName")}required />
                <input type ="text" placeholder="gender" {...register("gender")}required />


                <p>Birthdate</p>
                <input type="date" id="start" {...register("recipientBirthDatePost")} required/>
                <br/>
                <br/>

                <br/>
                <p>Enter recipient home address</p>
                <br/>
                <input type ="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
                <input type ="text" placeholder="street" {...register("street")} required/>
                <input type ="text" placeholder="city" {...register("city")} required />
                <input type ="text" placeholder="province" {...register("province")} required/>
                <input type ="text" placeholder="postalCode" {...register("postalCode")}required />
                <input type ="text" placeholder="country" {...register("country")} required />
                <br/>

                <p>Enter recipient description</p>
                <br/>
                <textarea rows={10} cols={100}  placeholder='Description' {...register("recipientDescriptionPost")} required />

                <br/>
                <br/>
                <input type="submit" />



            </form>

            <br/>
            <br/>





        </div>
    )


}


export default RecipientPost;
