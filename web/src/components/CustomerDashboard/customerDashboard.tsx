import RecipientGet from "../StaffDashboard/recipientGet";
import CustomerRecipientGet from "../CustomerDashboard/customerRecipientGet";
import CustomerTransactionGet from "../CustomerDashboard/customerTransactionGet";
import CustomerTransactionPost from "./customerTransactionPost";
import CustomerTransactionDelete from "./customerTransactionDelete";
import CustomerDonatePost from "./customerDonatePost";
import CustomerMonthlyDonationDelete from "./customerMonthlyDonationDelete";
import CustomerDonatePut from "./customerDonatePut";
import CustomerDonationGet from "./customerDonationGet";
import {Container} from "react-bootstrap";


const CustomerDashboard = () => {


    return (


        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "300vh"}}>
        <div className="w-100" style={{maxWidth: '1000px'}}>

            <RecipientGet/>

            <CustomerDonatePost/>
            <CustomerDonatePut/>
            <CustomerMonthlyDonationDelete/>
            <CustomerDonationGet/>




            <CustomerTransactionPost/>
            <CustomerTransactionDelete/>



        </div>
        </Container>
    )


}


export default CustomerDashboard;
