import CustomerPost from "./customerPost";
import CustomerPut from "./customerPut";
import CustomerDelete from "./customerDelete";
import CustomerGet from "./customerGet";
import RecipientGet from "../StaffDashboard/recipientGet";
import CustomerRecipientGet from "../CustomerDashboard/customerRecipientGet";
import CustomerTransactionGet from "../CustomerDashboard/customerTransactionGet";
import CustomerTransactionPost from "./customerTransactionPost";
import CustomerTransactionDelete from "./customerTransactionDelete";
import CustomerDonatePost from "./customerDonatePost";
import CustomerMonthlyDonationDelete from "./customerMonthlyDonationDelete";
import CustomerDonatePut from "./customerDonatePut";
import CustomerDonationGet from "./customerDonationGet";


const CustomerDashboard = () => {


    return (


        <div>
            <CustomerPost/>
            <CustomerPut/>
            <CustomerDelete/>
            <CustomerGet/>
            <RecipientGet/>
            <CustomerRecipientGet/>

            <CustomerDonatePost/>
            <CustomerDonatePut/>
            <CustomerMonthlyDonationDelete/>
            <CustomerDonationGet/>




            <CustomerTransactionGet/>
            <CustomerTransactionPost/>
            <CustomerTransactionDelete/>



        </div>
    )


}


export default CustomerDashboard;
