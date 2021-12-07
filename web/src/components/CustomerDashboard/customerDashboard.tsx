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

            <RecipientGet/>

            <CustomerDonatePost/>
            <CustomerDonatePut/>
            <CustomerMonthlyDonationDelete/>
            <CustomerDonationGet/>




            <CustomerTransactionPost/>
            <CustomerTransactionDelete/>



        </div>
    )


}


export default CustomerDashboard;
