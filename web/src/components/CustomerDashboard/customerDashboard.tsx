import CustomerPost from "./customerPost";
import CustomerPut from "./customerPut";
import CustomerDelete from "./customerDelete";
import CustomerGet from "./customerGet";


const CustomerDashboard = () => {


    return (


        <div>
            <CustomerPost/>
            <CustomerPut/>
            <CustomerDelete/>
            <CustomerGet/>
            {/*<RecipientPost/>*/}
            {/*<RecipientPut/>*/}
            {/*<RecipientDelete/>*/}
            {/*<RecipientGet/>*/}
            {/*<CustomerRecipientGet/>*/}
            {/*<CustomerTransactionGet/>*/}


        </div>
    )


}


export default CustomerDashboard;
