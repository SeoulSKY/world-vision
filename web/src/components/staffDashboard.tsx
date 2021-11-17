import React from "react";
import { useForm } from 'react-hook-form';

const StaffDashboard = () => {
   
    const {register, handleSubmit} = useForm();
    

    const onSubmitStaff = (data: any)=> {
        // test that we can assess the user posted form data
        console.log(data.userId + " " + data.firstName + " " +data.country)
    }

    const onSubmitRecipient = (data: any)=> {
        // test that we can assess the user posted form data
        console.log(data.userId + " " + data.firstName + " " +data.country + " " + data.birthDate)
    }


    return (
        
        <div>
            <b>Create New Staff Account</b>
            <br/>
            <p>Enter staff personal details</p>

            <form onSubmit={handleSubmit(onSubmitStaff)}>
            <input type ="text" placeholder="userId" {...register("userId") } required />
            <input type ="text" placeholder="firstName" {...register("firstName")} required/>
            <input type ="text" placeholder="middleName" {...register("middleName")} required/>
            <input type ="text" placeholder="lastName" {...register("lastName")}required /> 
            <br/>
            <p>Enter staff home address</p>
            <br/>
            <input type ="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
            <input type ="text" placeholder="street" {...register("street")} required/>
            <input type ="text" placeholder="city" {...register("city")} required />
            <input type ="text" placeholder="province" {...register("province")} required/>
            <input type ="text" placeholder="postalCode" {...register("postalCode")}required />
            <input type ="text" placeholder="country" {...register("country")} required />
            <br/>
            <input type="submit" />        
        </form>

        <br/>
        <br/>

        <b>Create New Recipient Account</b>
            <br/>
            <p>Enter recipient personal details</p>

            <form onSubmit={handleSubmit(onSubmitRecipient)}>
            <input type ="text" placeholder="userId" {...register("userId") } required />
            <input type ="text" placeholder="firstName" {...register("firstName")} required/>
            <input type ="text" placeholder="middleName" {...register("middleName")} required/>
            <input type ="text" placeholder="lastName" {...register("lastName")}required /> 
            <input type ="text" placeholder="gender" {...register("gender")}required /> 
            <input type="date" id="start" defaultValue="2001-01-01" {...register("birthDate")} required/>
            
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
            <input type ="textarea"  placeholder="description" {...register("description")} required />

            <input type="submit" />   
            
             

        </form>


            

        </div>
    )


}

export default StaffDashboard;
