
import React, { useEffect, useState } from 'react';


import { useForm } from 'react-hook-form';



const StaffGet = () => {




    const {register, handleSubmit, reset} = useForm();

    const onSubmitStaffGet= (dataStaffGet: any)=> {


        let userId = dataStaffGet.userId
        resetForm(dataStaffGet)

        // if empty id return all staff members
        if (userId!= "") {
            fetch('http://localhost:5000/api/staff?userId=' + userId)
                .then(response => response.json())
                .then(data => display_info(data));
        }


        else {
            fetch('http://localhost:5000/api/staff' )
                .then(response => response.json())
                .then(data => display_info(data));
        }





    }

    function display_info(data: any) {
        data = JSON.stringify(data)
        console.log(data)
        reset({
            staffUserDisplay: data
        }, {

        });

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

            <h2>Get Staff Account</h2>
            <p>Enter ID of Staff Account to get Staff with Id. If no Id is given all staff are shown
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffGet)}>
                <input type ="text" placeholder="userId" {...register("userId") } />
                <br/>
                <br/>
                <textarea readOnly = {true} rows={10} cols={100}  placeholder='Staff Member info will be shown here' {...register("staffUserDisplay")} />
                <br/>
                <br/>
                <input type="submit" />
            </form>

            <br/>
            <br/>


        </div>
    )


}


export default StaffGet;
