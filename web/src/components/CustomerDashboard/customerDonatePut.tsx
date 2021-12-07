import {useForm} from 'react-hook-form';
import {useAuth} from "../../contexts/AuthContext ";


const CustomerDonatePut = () => {

    const {register, handleSubmit, reset, resetField} = useForm();
    const {currentUser} = useAuth();


    const onSubmitCustomerPut = (dataCustomerPut:any) => {
        // used to handle put request for monthly donation
        const dataDonation = {
            "customerUserId": currentUser.uid,
            "recipientUserId": dataCustomerPut.recipientUserId,
            "monthlyTransactionAmount": parseFloat(dataCustomerPut.monthlyDonation)
        };

        // Post request using fetch with error handling
        fetch('http://localhost:5000/api/donation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataDonation),
        }).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;

                return Promise.reject(error);
            }


        })
            .catch(error => {

                if (error === 404) {
                    alert("Please enter valid customer and recipient user ID's to edit monthly donation")
                }

                else {
                    alert("Error editing monthly donation to recipient: " + error)
                }

            });


        // reset Form
        for (const key in dataCustomerPut) {
            resetField(key);
        }
        reset({});
    }


    return (

        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Edit monthly donation amount</h2>
            <p>Please enter the customer and recipient user Id to edit the monthly donation amount</p>

            <form onSubmit={handleSubmit(onSubmitCustomerPut)}>
                <input type="text" placeholder="Recipient userId" {...register("recipientUserId")} required/>
                <input type="number" step="0.01"  placeholder="Monthly donation amount" {...register("monthlyDonation")} required/>
                <br/>
                <br/>
                <input type="submit"/>
            </form>

            <br/>
            <br/>

        </div>
    )


}


export default CustomerDonatePut;
