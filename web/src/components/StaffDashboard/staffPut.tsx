
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';



const StaffPut= () => {

    const {register, handleSubmit, reset} = useForm();

    const onSubmitStaffPut = (dataStaffPut: any)=> {
        // used to handle put request for staff account

        // used to handle post request for staff account
        const data = {
            "userId": dataStaffPut.userId,
            "firstName": dataStaffPut.firstName,
            "middleName": dataStaffPut.middleName,
            "lastName": dataStaffPut.lastName,
            "homeAddress": {
                "street": dataStaffPut.street,
                "city": dataStaffPut.city,
                "province": dataStaffPut.province,
                "postalCode": dataStaffPut.postalCode,
                "country": dataStaffPut.country
            }
        };

        fetch('http://localhost:5000/api/staff', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });




        // test that we can assess the user posted form data put request of staff account
        resetForm(dataStaffPut)

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

            <h2>Edit Staff Account Details</h2>
            <p>Enter ID of Staff Account to edit along with any optional field you would like to modify
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffPut)}>
                <input type ="text" placeholder="userId" {...register("userId") } required />
                <input type ="text" placeholder="firstName" {...register("firstName")} required/>
                <input type ="text" placeholder="middleName" {...register("middleName")} required/>
                <input type ="text" placeholder="lastName" {...register("lastName")}required />
                <br/>
                <input type ="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
                <input type ="text" placeholder="street" {...register("street")} required/>
                <input type ="text" placeholder="city" {...register("city")} required />
                <input type ="text" placeholder="province" {...register("province")} required/>
                <input type ="text" placeholder="postalCode" {...register("postalCode")}required />
                <input type ="text" placeholder="country" {...register("country")} required />
                <br/>
                <br/>
                <input type="submit" />

            </form >
            <br/>
            <br/>

        </div>
    )


}


export default StaffPut;
