import CustomerPost from "./customerPost";
import CustomerPut from "./customerPut";
import CustomerDelete from "./customerDelete";
import CustomerGet from "./customerGet";
import RecipientGet from "../StaffDashboard/recipientGet";
import CustomerRecipientGet from "../StaffDashboard/customerRecipientGet";
import CustomerTransactionGet from "../StaffDashboard/customerTransactionGet";
import CustomerDonatePost from "./customerDonatePost";
import CustomerDonatePut from "./customerDonatePut";
import CustomerMonthlyDonationDelete from "./customerMonthlyDonationDelete";
import CustomerDonationGet from "./customerDonationGet";
import CustomerTransactionPost from "./customerTransactionPost";
import CustomerTransactionDelete from "./customerTransactionDelete";


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
            <CustomerTransactionPost/>
            <CustomerTransactionDelete/>

            <CustomerDonatePost/>
            <CustomerDonatePut/>
            <CustomerMonthlyDonationDelete/>
            <CustomerDonationGet/>


        </div>
    )


}


export default CustomerDashboard;
