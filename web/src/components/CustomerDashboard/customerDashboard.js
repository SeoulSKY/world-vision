import CustomerPost from "./customerPost";
import CustomerPut from "./customerPut";
import CustomerDelete from "./customerDelete";
import CustomerGet from "./customerGet";
import RecipientGet from "../StaffDashboard/recipientGet";
import CustomerRecipientGet from "../StaffDashboard/customerRecipientGet";
import CustomerTransactionGet from "../StaffDashboard/customerTransactionGet";


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


        </div>
    )


}


export default CustomerDashboard;
