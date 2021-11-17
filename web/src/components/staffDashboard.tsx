import React from "react";
import { useForm } from 'react-hook-form';

const StaffDashboard = () => {
   
    const {register, handleSubmit} = useForm();
    

    const onSubmitStaffPost = (dataStaffPost: any)=> {
        // test that we can assess the user posted form data
        console.log(dataStaffPost.staffUserIdPost + " " + dataStaffPost.staffFirstNamePost + " " +dataStaffPost.staffCountryPost)
    }

    const onSubmitRecipientPost = (dataRecipientPost: any)=> {
        // test that we can assess the user posted form data
        console.log(dataRecipientPost.recipientUserIdPost + " " + dataRecipientPost.recipientFirstNamePost + " " +dataRecipientPost.recipientCountryPost + " " + dataRecipientPost.recipientBirthDatePost+ " " + dataRecipientPost.recipientDescriptionPost)
    }


    return (
        
        <div>
            <b>Create New Staff Account</b>
            <br/>
            <p>Enter staff personal details</p>

            <form onSubmit={handleSubmit(onSubmitStaffPost)}>
            <input type ="text" placeholder="userId" {...register("staffUserIdPost") } required />
            <input type ="text" placeholder="firstName" {...register("staffFirstNamePost")} required/>
            <input type ="text" placeholder="middleName" {...register("staffMiddleNamePost")} required/>
            <input type ="text" placeholder="lastName" {...register("staffLastNamePost")}required /> 
            <br/>
            <p>Enter staff home address</p>
            <br/>
            <input type ="text" placeholder="buildingNumber" {...register("staffBuildingNumberPost")} required/>
            <input type ="text" placeholder="street" {...register("staffStreetPost")} required/>
            <input type ="text" placeholder="city" {...register("staffCityPost")} required />
            <input type ="text" placeholder="province" {...register("staffProvincePost")} required/>
            <input type ="text" placeholder="postalCode" {...register("staffPostalCodePost")}required />
            <input type ="text" placeholder="country" {...register("staffCountryPost")} required />
            <br/>
            <input type="submit" />        
        </form>

        <br/>
        <br/>

        <b>Create New Recipient Account</b>
            <br/>
            <p>Enter recipient personal details</p>

            <form onSubmit={handleSubmit(onSubmitRecipientPost)}>
            <input type ="text" placeholder="userId" {...register("recipientUserIdPost") } required />
            <input type ="text" placeholder="firstName" {...register("recipientFirstNamePost")} required/>
            <input type ="text" placeholder="middleName" {...register("recipientMiddleNamePost")} required/>
            <input type ="text" placeholder="lastName" {...register("recipientLastNamePost")}required /> 
            <input type ="text" placeholder="gender" {...register("recipientGenderPost")}required /> 
            <input type="date" id="start" defaultValue="2001-01-01" {...register("recipientBirthDatPost")} required/>
            
            <br/>
            <p>Enter recipient home address</p>
            <br/>
            <input type ="text" placeholder="buildingNumber" {...register("recipientBuildingNumberPost")} required/>
            <input type ="text" placeholder="street" {...register("recipientStreetPost")} required/>
            <input type ="text" placeholder="city" {...register("recipientCityPost")} required />
            <input type ="text" placeholder="province" {...register("recipientProvincePost")} required/>
            <input type ="text" placeholder="postalCode" {...register("recipientPostalCodePost")}required />
            <input type ="text" placeholder="country" {...register("recipientCountryPost")} required />
            <br/>
              
            <p>Enter recipient description</p>
            <br/>
            <input type ="textarea"  placeholder="description" {...register("recipientDescriptionPost")} required />
            <br/>
            <input type="submit" />   
            
             

        </form>


            

        </div>
    )


}

export default StaffDashboard;
