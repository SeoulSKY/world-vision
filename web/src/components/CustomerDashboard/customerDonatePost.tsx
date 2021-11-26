import {useForm} from 'react-hook-form';
import {useAuth} from "../../contexts/AuthContext ";


const CustomerDonatePost = () => {

    const {register, handleSubmit, reset, resetField} = useForm();
    const {currentUser} = useAuth();

    const onSubmitCustomerPost = (dataCustomerPost:any) => {
        // used to handle post request for monthly donation
        const dataDonation = {
            "customerUserId": currentUser.uid,
            "recipientUserId": dataCustomerPost.recipientUserId,
            "monthlyTransactionAmount": parseFloat(dataCustomerPost.monthlyDonation)
        };

        // Post request using fetch with error handling
        fetch('http://localhost:5000/api/donation', {
            method: 'POST',
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
                    alert("Please enter valid customer and recipient user ID's to make donation")
                }

                else if (error === 409) {
                    alert("You have already made a donation to this recipient")
                }


                else {
                    alert("Error making monthly donation to recipient: " + error)
                }

            });


        // reset Form
        for (const key in dataCustomerPost) {
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
            <h2>Make a monthly donation</h2>
            <p>Please select a recipient to subscribe to a monthly donation.</p>

            <form onSubmit={handleSubmit(onSubmitCustomerPost)}>
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


export default CustomerDonatePost;
