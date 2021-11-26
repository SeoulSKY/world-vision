import {useForm} from 'react-hook-form';


const CustomerDonationGet = () => {


    const {register, handleSubmit, reset, resetField} = useForm();

    const onSubmitCustomerGet = (dataStaffGet) => {


        let userId = dataStaffGet.userId


        // if empty id return all staff members


            fetch('http://localhost:5000/api/donation?customerUserId=' + userId, {method: 'GET'})
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        display_info(data)
                    }


                })
                .catch(error => {

                    if (error === 404) {
                        alert("No customer member with specified userId")
                    } else {
                        alert("Error getting customer donations " + error)
                    }


                });

        // reset Form
        for (var key in dataStaffGet) {
            resetField(key);
        }
        reset({});


    }

    function display_info(data) {
        data = JSON.stringify(data, null, 2);
        console.log(data)
        reset({
            customerUserDisplay: data
        }, {});

    }

    return (

        <div>

            <h2>Get Customer Donations</h2>
            <p>Enter ID of Customer Account to get Customer's donation history
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerGet)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <br/>
                <br/>
                <textarea readOnly={true} rows={10} cols={100}
                          placeholder='Customer Member info will be shown here' {...register("customerUserDisplay")} />
                <br/>
                <br/>
                <input type="submit"/>
            </form>

            <br/>
            <br/>


        </div>
    )


}


export default CustomerDonationGet;
