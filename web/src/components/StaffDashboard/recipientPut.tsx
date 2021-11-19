
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
                <input type ="text" placeholder="userId" {...register("recipientUserIdPut") } required />
                <br/>
                <br/>
                <input type ="text" placeholder="firstName" {...register("recipientFirstNamePut")} />
                <input type ="text" placeholder="middleName" {...register("recipientMiddleNamePut")} />
                <input type ="text" placeholder="lastName" {...register("recipientLastNamePut")} />
                <input type ="text" placeholder="gender" {...register("recipientGenderPut")} />
                <p>Birthdate</p>
                <input type="date" id="start" {...register("recipientBirthDatePut")} />
                <br/>
                <br/>

                <input type ="text" placeholder="buildingNumber" {...register("recipientBuildingNumberPut")} />
                <input type ="text" placeholder="street" {...register("recipientStreetPut")} />
                <input type ="text" placeholder="city" {...register("recipientCityPut")}  />
                <input type ="text" placeholder="province" {...register("recipientProvincePut")} />
                <input type ="text" placeholder="postalCode" {...register("recipientPostalCodePut")} />
                <input type ="text" placeholder="country" {...register("recipientCountryPut")}  />
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
