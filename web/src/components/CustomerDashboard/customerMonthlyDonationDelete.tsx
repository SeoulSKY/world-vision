import {useForm} from 'react-hook-form';
import {useAuth} from "../../contexts/AuthContext ";


const CustomerMonthlyDonationDelete = () => {


    const {handleSubmit, reset} = useForm();

    const {currentUser} = useAuth();

    const onSubmitCustomerDelete = () => {

        let userId = currentUser.uid


        // DELETE request using fetch with error handling

        fetch("http://localhost:5000/api/donation?customerUserId=" + userId, {method: 'DELETE'})
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert('Your  monthly donations have been deleted')
                }


            })
            .catch(error => {
                if (error === 404) {
                    alert("Not valid userId to delete")
                } else {
                    alert("Error deleting customer donations")
                }

            });


        reset({});


    }


    return (


        <div>

            <br/>
            <br/>

            <h2>Delete Customer Donations</h2>

            <form onSubmit={handleSubmit(onSubmitCustomerDelete)}>
               <p>Press submit to delete your monthly donations</p>
                <input type="submit"/>
            </form>

            <br/>
            <br/>

        </div>
    )


}


export default CustomerMonthlyDonationDelete;
