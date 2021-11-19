
import React, { useEffect, useState } from 'react';
// import NavBar from './components'

import { useForm } from 'react-hook-form';


  
const StaffDashboard = () => {

    let [flaskMessage, setFlaskMessage] = useState("Failed to connect to the server.")

    useEffect(() => {
        fetch("http://localhost:5000/api/hello")
            .then((response) => {
                response.text().then((text) => setFlaskMessage(text)).catch(error => console.log(error));
            })
            .catch((error) => console.log(error));
    }, []);


    const {register, handleSubmit, reset} = useForm();
    

    const onSubmitStaffPost = (dataStaffPost: any)=> {
        // used to handle post request for staff account

        // test that we can assess the user posted form data for adding new staff account
        console.log(dataStaffPost.staffUserIdPost + " " + dataStaffPost.staffFirstNamePost + " " +dataStaffPost.staffCountryPost)
        resetForm(dataStaffPost)

    }

    const onSubmitStaffPut = (dataStaffPut: any)=> {
        // used to handle put request for staff account

        // test that we can assess the user posted form data put request of staff account
        console.log(dataStaffPut.staffUserIdPut + " " + dataStaffPut.staffFirstNamePut + " " +dataStaffPut.staffCountryPut)
        resetForm(dataStaffPut)



        }
        
    const onSubmitStaffDelete = (dataStaffDelete: any)=> {
        // used to handle put request for staff account

        // test that we can assess the user posted form data put request of staff account
        console.log(dataStaffDelete.staffUserIdDelete)
        resetForm(dataStaffDelete)

    }


  
        
    const onSubmitStaffGet= (dataStaffGet: any)=> {
        console.log(dataStaffGet.staffUserIdGet)






        resetForm(dataStaffGet)
        reset({ staffUserDisplay:flaskMessage,});
   
    }




    const onSubmitRecipientPost = (dataRecipientPost: any)=> {
         // used to handle post request for recipient account

        // test that we can assess the user posted form data for adding new recipient account
        console.log(dataRecipientPost.recipientUserIdPost + " " + dataRecipientPost.recipientFirstNamePost + " " +dataRecipientPost.recipientCountryPost + " " + dataRecipientPost.recipientBirthDatePost+ " " + dataRecipientPost.recipientDescriptionPost)
        resetForm(dataRecipientPost)
    }

    const onSubmitRecipientPut = (dataRecipientPut: any)=> {
        // used to handle post request for recipient account

       // test that we can assess the user posted form data for adding new recipient account
       console.log(dataRecipientPut.recipientUserIdPut)
       resetForm(dataRecipientPut)
   }


   const onSubmitRecipientDelete = (dataRecipientDelete: any)=> {
    // used to handle put request for staff account

    // test that we can assess the user posted form data put request of staff account
    console.log(dataRecipientDelete.recipientUserIdDelete)
    console.log(dataRecipientDelete)
    resetForm(dataRecipientDelete)

}

const onSubmitRecipientGet = (dataRecipientGet: any)=> {
    // used to handle put request for staff account

    // test that we can assess the user posted form data put request of staff account
    console.log(dataRecipientGet.recipientUserIdGet)
    resetForm(dataRecipientGet)



}


const onSubmitCustomerGet = (dataCustomerGet: any)=> {
    // used to handle put request for staff account

    // test that we can assess the user posted form data put request of staff account
    console.log(dataCustomerGet.customerUserIdGet)
    resetForm(dataCustomerGet)

}

function resetForm(data: any) {

    console.log(data)

    for (var key in data) {
        data[key] =""
    }
    reset({staffUserIdPost:"",});
    reset({staffFirstNamePost:"",});
    reset({ staffMiddleNamePost:"",});
    reset({ staffLastNamePost:"",});
    reset({ staffBuildingNumberPost:"",});
    reset({ staffStreetPost:"",});
    reset({ staffCityPost:"",});
    reset({ staffProvincePost:"",});
    reset({ staffPostalCodePost:"",});    
    reset({ staffCountryPost:"",});    
    reset({ staffUserIdPut:"",});    
    reset({ staffFirstNamePut:"",});    
    reset({ staffMiddleNamePut:"",});    
    reset({ staffLastNamePut:"",});    
    reset({ staffBuildingNumberPut:"",});  
    reset({ staffStreetPut:"",});  
    reset({ staffCityPut:"",});  
    reset({ staffProvincePut:"",});  
    reset({ staffPostalCodePPut:"",});  
    reset({ staffCountryPut:"",});  
    reset({ staffUserIdDelete:"",});  
    reset({ staffUserIdGet:"",});  
    reset({ staffUserDisplay:"",}); 

    reset({ recipientUserIdPost:"",});  
    reset({ recipientFirstNamePost:"",});  
    reset({ recipientMiddleNamePost:"",});  
    reset({ recipientLastNamePost:"",});  
    reset({ recipientGenderPost:"",});  
    reset({ recipientBirthDatePost:"",});  
    reset({ recipientBuildingNumberPost:"",});  
    reset({ recipientStreetPost:"",});  
    reset({ recipientCityPost:"",});  
    reset({ recipientProvincePost:"",});  
    reset({ recipientPostalCodePost:"",});  
    reset({ recipientCountryPost:"",});  
    reset({ recipientCountryPost:"",});  
    reset({ recipientDescriptionPost:"",});  
    reset({ recipientUserIdPut:"",});  
    reset({ recipientFirstNamePut:"",});  
    reset({ recipientMiddleNamePut:"",});  
    reset({ recipientLastNamePut:"",});  
    reset({ recipientGenderPut:"",});  
    reset({ recipientBirthDatePut:"",});  
    reset({ recipientBuildingNumberPut:"",});
    reset({ recipientStreetPut:"",});  
    reset({ recipientCityPut:"",});  
    reset({ recipientProvincePut:"",});  
    reset({ recipientPostalCodePut:"",});  
    reset({ recipientCountryPut:"",});  
    reset({ recipientDescriptionPut:"",});  
    reset({ recipientDescriptionPut:"",});  
    reset({ recipientUserIdDelete:"",});  
    reset({ recipientUserIdGet:"",});  
    reset({ recipientUserDisplay:"",});  

    reset({ customerUserIdGet:"",});  
    reset({ customerUserDisplayRecipients:"",});  

  }


    return (

        
        
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Create New Staff Account</h2>
            <p>Enter staff personal details</p>

            <form onSubmit={handleSubmit(onSubmitStaffPost)}>
            <input type ="text" placeholder="userId" {...register("staffUserIdPost") } required />
            <input type ="text" placeholder="firstName" {...register("staffFirstNamePost")} required/>
            <input type ="text" placeholder="middleName" {...register("staffMiddleNamePost")} required/>
            <input type ="text" placeholder="lastName" {...register("staffLastNamePost")}required /> 
            <br/>
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
            <br/>
            <input type="submit" />        
        </form>

            <br/>
            <br/>

            <h2>Edit Staff Account Details</h2>
            <p>Enter ID of Staff Account to edit along with any optional field you would like to modify
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffPut)}>
            <input type ="text" placeholder="userId" {...register("staffUserIdPut") } required />
            <input type ="text" placeholder="firstName" {...register("staffFirstNamePut")} />
            <input type ="text" placeholder="middleName" {...register("staffMiddleNamePut")} />
            <input type ="text" placeholder="lastName" {...register("staffLastNamePut")} /> 
            <br/>
            <input type ="text" placeholder="buildingNumber" {...register("staffBuildingNumberPut")} />
            <input type ="text" placeholder="street" {...register("staffStreetPut")} />
            <input type ="text" placeholder="city" {...register("staffCityPut")}  />
            <input type ="text" placeholder="province" {...register("staffProvincePut")} />
            <input type ="text" placeholder="postalCode" {...register("staffPostalCodePPut")} />
            <input type ="text" placeholder="country" {...register("staffCountryPut")}  />
            <br/>
            <br/>
            <input type="submit" />        
        
        </form >
        <br/>
        <br/>

        <h2>Delete Staff Account</h2>
            <p>Enter ID of Staff Account to delete
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffDelete)}>
            <input type ="text" placeholder="userId" {...register("staffUserIdDelete") } required />
            <input type="submit" />      
        </form>

        <br/>
        <br/>
        <h2>Get Staff Account</h2>
            <p>Enter ID of Staff Account to get Staff with Id. If no Id is given all staff are shown
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffGet)}>
            <input type ="text" placeholder="userId" {...register("staffUserIdGet") } required />
            <br/>
            <br/>
            <textarea readOnly = {true} rows={10} cols={100}  placeholder='Staff Member info will be shown here' {...register("staffUserDisplay")} />
            <br/>
            <br/>
            <input type="submit" />      
        </form>





        <br/>
        <br/>

        <h2>Create New Recipient Account</h2>
            <p>Enter recipient personal details</p>

            <form onSubmit={handleSubmit(onSubmitRecipientPost)}>
            <input type ="text" placeholder="userId" {...register("recipientUserIdPost") } required />
            <input type ="text" placeholder="firstName" {...register("recipientFirstNamePost")} required/>
            <input type ="text" placeholder="middleName" {...register("recipientMiddleNamePost")} required/>
            <input type ="text" placeholder="lastName" {...register("recipientLastNamePost")}required /> 
            <input type ="text" placeholder="gender" {...register("recipientGenderPost")}required /> 
         

            <p>Birthdate</p>
            <input type="date" id="start" {...register("recipientBirthDatePost")} required/>
            <br/>
            <br/>
            
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
            <textarea rows={10} cols={100}  placeholder='Description' {...register("recipientDescriptionPost")} required />
           
            <br/>
            <br/>
            <input type="submit" />   
            
             

        </form>

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


        <h2>Delete Recipient Account</h2>
            <p>Enter ID of Recipient Account to delete
            </p>

            <form onSubmit={handleSubmit(onSubmitRecipientDelete)}>
            <input type ="text" placeholder="userId" {...register("recipientUserIdDelete") } required />
            <input type="submit" />      
        </form>
            

        <br/>
        <br/>
        <h2>Get Recipient Account</h2>
            <p>Enter ID of Recipient Account to get Recipient information. If no Id is given all recipients will be displayed
            </p>

            <form onSubmit={handleSubmit(onSubmitRecipientGet)}>
            <input type ="text" placeholder="userId" {...register("recipientUserIdGet") } />
            <br/>
            <br/>
            <textarea readOnly = {true} rows={10} cols={100}  placeholder='Recipient info will be shown here' {...register("recipientUserDisplay")} />
            <br/>
            <br/>
            <input type="submit" />      
        </form>

        <h2>Get Customer Account's Recipients</h2>
            <p>Enter ID of Customer Account to get the Customer's recipients. 
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerGet)}>
            <input type ="text" placeholder="userId" {...register("customerUserIdGet") } required />
            <br/>
            <br/>
            <textarea readOnly = {true} rows={10} cols={100}  placeholder="Customer's recipients will be shown here" {...register("customerUserDisplayRecipients")} />
            <br/>
            <br/>
            <input type="submit" />      
        </form>




        </div>
    )


}


export default StaffDashboard;
