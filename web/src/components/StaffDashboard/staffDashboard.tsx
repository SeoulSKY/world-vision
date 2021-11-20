
import React, { useEffect, useState } from 'react';
// import NavBar from './components'

import { useForm } from 'react-hook-form';
import StaffPost from "./staffPost";
import StaffPut from "./staffPut";
import StaffDelete from "./staffDelete";
import StaffGet from "./staffGet";
import RecipientPost from "./recipientPost";
import RecipientPut from "./recipientPut";
import RecipientDelete from "./recipientDelete";
import RecipientGet from "./recipientGet";
import CustomerRecipientGet from "./customerRecipientGet";


  
const StaffDashboard = () => {



    return (

        
        
        <div>
            <StaffPost/>
            <StaffPut/>
            <StaffDelete/>
            <StaffGet/>
            <RecipientPost/>
            <RecipientPut/>
            <RecipientDelete/>
            <RecipientGet/>
            <CustomerRecipientGet/>




        </div>
    )


}


export default StaffDashboard;
