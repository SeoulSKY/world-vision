import {useForm} from 'react-hook-form';


const CustomerDelete = () => {


    const {register, handleSubmit, reset} = useForm();


    const onSubmitStaffDelete = (dataCustomerDelete: any) => {

        let userId = dataCustomerDelete.userId


        // DELETE request using fetch with error handling

        fetch("http://localhost:5000/api/customer?userId=" + userId, {method: 'DELETE'})
            .then(async response => {
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
                    alert("Not valid userId to delete")
                } else {
                    alert("Error deleting customer")
                }

            });


        reset({});


    }


    return (


        <div>

            <br/>
            <br/>

            <h2>Delete Customer Account</h2>
            <p>Enter ID of Customer Account to delete
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffDelete)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <input type="submit"/>
            </form>

            <br/>
            <br/>

        </div>
    )


}


export default CustomerDelete;
