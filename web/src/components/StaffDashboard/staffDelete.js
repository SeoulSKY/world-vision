import {useForm} from 'react-hook-form';


const StaffDelete = () => {


    const {register, handleSubmit, reset, resetField} = useForm();


    const onSubmitStaffDelete = (dataStaffDelete) => {

        let userId = dataStaffDelete.userId

        // used to handle delete request for staff account

        fetch("http://localhost:5000/api/staff?userId=" + userId, {method: 'DELETE'})
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
                    alert("Error deleting staff: " + error)
                }

            });


        // reset Form
        for (var key in dataStaffDelete) {
            resetField(key);
        }
        reset({});


    }


    return (


        <div>

            <br/>
            <br/>

            <h2>Delete Staff Account</h2>
            <p>Enter ID of Staff Account to delete
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


export default StaffDelete;
