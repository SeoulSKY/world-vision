import React from "react";



const StaffDashboard = () => {
    return (
        <div>
            <b>Create New Staff Account</b>
            <br/>
            <p>Enter staff personal details</p>
            <form>
            <input type ="text" placeholder="userId" name="userId" />
            <input type ="text" placeholder="firstName" name="firstName" />
            <input type ="text" placeholder="middleName" name="middleName" />
            <input type ="text" placeholder="lastName" name="lastName" /> 
            <br/>
            <p>Enter staff home address</p>
            <br/>
            <input type ="text" placeholder="street" name="street" />
            <input type ="text" placeholder="city" name="city" />
            <input type ="text" placeholder="province" name="province" />
            <input type ="text" placeholder="postalCode" name="postalCode" />
            <input type ="text" placeholder="country" name="country" />
            <br/>
            <input type="submit" />        
        </form>

        </div>
    )


}

export default StaffDashboard;
