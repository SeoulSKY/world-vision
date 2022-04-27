import StaffGet from "./staffGet";
import RecipientPost from "./recipientPost";
import RecipientPut from "./recipientPut";
import RecipientDelete from "./recipientDelete";
import RecipientGet from "./recipientGet";
import CustomerRecipientGet from "./customerRecipientGet";
import CustomerTransactionGet from "./customerTransactionGet";
import CustomerGet from "../CustomerDashboard/customerGet";
import {Container} from "react-bootstrap";

const StaffDashboard = () => {


    // @ts-ignore
    return (

        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "590vh"}}>
        <div className="w-100" style={{maxWidth: '1000px'}}>
            <StaffGet/>
            <RecipientPost/>
            <RecipientPut/>
            <RecipientDelete/>
            <RecipientGet/>
            <CustomerGet/>
            <CustomerRecipientGet/>
            <CustomerTransactionGet/>
        </div>
        </Container>
    )


}


export default StaffDashboard;
