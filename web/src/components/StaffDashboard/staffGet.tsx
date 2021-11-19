
import React, { useEffect, useState } from 'react';


import { useForm } from 'react-hook-form';



const StaffGet = () => {




    const {register, handleSubmit, reset} = useForm();

    const onSubmitStaffGet= (dataStaffGet: any)=> {

        resetForm(dataStaffGet)


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
                <input type ="text" placeholder="userId" {...register("userId") } required />
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
