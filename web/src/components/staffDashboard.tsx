import React from "react";
import { useForm } from 'react-hook-form';

const StaffDashboard = () => {
   
    const {register, handleSubmit} = useForm();
    

    const onSubmit = (data: any)=> {
        console.log(data)
    }
    return (
        
        <div>
            <b>Create New Staff Account</b>
            <br/>
            <p>Enter staff personal details</p>

            <form onSubmit={handleSubmit(onSubmit)}>
            <input type ="text" placeholder="userId" {...register("userID")}/>
            <input type ="text" placeholder="firstName" {...register("firstName")}/>
            <input type ="text" placeholder="middleName" {...register("middleName")}/>
            <input type ="text" placeholder="lastName" {...register("lastName")}/> 
            <br/>
            <p>Enter staff home address</p>
            <br/>
            <input type ="text" placeholder="street" {...register("street")} />
            <input type ="text" placeholder="city" {...register("city")} />
            <input type ="text" placeholder="province" {...register("province")}/>
            <input type ="text" placeholder="postalCode" {...register("postalCode")}/>
            <input type ="text" placeholder="country" {...register("country")} />
            <br/>
            <input type="submit" />        
        </form>

        </div>
    )


}

export default StaffDashboard;
