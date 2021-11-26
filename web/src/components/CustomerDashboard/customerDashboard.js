import CustomerPost from "./customerPost";
import CustomerPut from "./customerPut";
import CustomerDelete from "./customerDelete";
import CustomerGet from "./customerGet";
import RecipientGet from "../StaffDashboard/recipientGet";
import CustomerRecipientGet from "../StaffDashboard/customerRecipientGet";
import CustomerTransactionGet from "../StaffDashboard/customerTransactionGet";
import CustomerDonate from "./customerDonate";


const CustomerDashboard = () => {


    return (


        <div>
            <CustomerPost/>
            <CustomerPut/>
            <CustomerDelete/>
            <CustomerGet/>
            <RecipientGet/>
            <CustomerRecipientGet/>
            <CustomerTransactionGet/>
            <CustomerDonate/>


        </div>
    )


}


export default CustomerDashboard;
