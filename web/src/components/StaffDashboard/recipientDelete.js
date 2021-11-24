import {useForm} from 'react-hook-form';


const RecipientDelete = () => {

    const {register, handleSubmit, reset, resetField} = useForm();


    const onSubmitRecipientDelete = (dataRecipientDelete) => {

        // used to handle delete request for recipient account

        let recipientUserId = dataRecipientDelete.userId
        fetch("http://localhost:5000/api/recipient?userId=" + recipientUserId, {method: 'DELETE'})
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
                    alert("Error deleting recipient: " + error)
                }

            });


        // reset Form
        for (var key in dataRecipientDelete) {
            resetField(key);
        }
        reset({});
    }


    return (


        <div>

            <br/>
            <br/>

            <h2>Delete Recipient Account</h2>
            <p>Enter ID of Recipient Account to delete
            </p>

            <form onSubmit={handleSubmit(onSubmitRecipientDelete)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <input type="submit"/>
            </form>


            <br/>
            <br/>


        </div>
    )


}


export default RecipientDelete;
