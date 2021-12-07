import StaffGet from "./staffGet";
import RecipientPost from "./recipientPost";
import RecipientPut from "./recipientPut";
import RecipientDelete from "./recipientDelete";
import RecipientGet from "./recipientGet";
import CustomerRecipientGet from "./customerRecipientGet";
import CustomerTransactionGet from "./customerTransactionGet";
import CustomerGet from "../CustomerDashboard/customerGet";


const StaffDashboard = () => {


    return (


        <div>

            <StaffGet/>
            <RecipientPost/>
            <RecipientPut/>
            <RecipientDelete/>
            <RecipientGet/>
            <CustomerGet/>
            <CustomerRecipientGet/>
            <CustomerTransactionGet/>


        </div>
    )


}


export default StaffDashboard;
