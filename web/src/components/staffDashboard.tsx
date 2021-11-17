import React from "react";
import { useForm } from 'react-hook-form';

const StaffDashboard = () => {
   
    const {register, handleSubmit} = useForm();
    

    const onSubmit = (data: any)=> {
        // test that we can assess the user posted form data
        console.log(data.userId + " " + data.firstName + " " +data.country)
    }
    return (
        
        <div>
            <b>Create New Staff Account</b>
            <br/>
            <p>Enter staff personal details</p>

            <form onSubmit={handleSubmit(onSubmit)}>
            <input type ="text" placeholder="userId" {...register("userId") } required />
            <input type ="text" placeholder="firstName" {...register("firstName")} required/>
            <input type ="text" placeholder="middleName" {...register("middleName")} required/>
            <input type ="text" placeholder="lastName" {...register("lastName")}required /> 
            <br/>
            <p>Enter staff home address</p>
            <br/>
            <input type ="text" placeholder="street" {...register("street")} required/>
            <input type ="text" placeholder="city" {...register("city")} required />
            <input type ="text" placeholder="province" {...register("province")} required/>
            <input type ="text" placeholder="postalCode" {...register("postalCode")}required />
            <input type ="text" placeholder="country" {...register("country")} required />
            <br/>
            <input type="submit" />        
        </form>



        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>   

        </div>
    )


}

export default StaffDashboard;
