import {useForm} from 'react-hook-form';


const CustomerGet = () => {


    const {register, handleSubmit, reset} = useForm();

    const onSubmitCustomerGet = (dataStaffGet: any) => {


        let userId = dataStaffGet.userId


        // if empty id return all staff members
        if (userId !== "") {

            fetch('http://localhost:5000/api/customer?userId=' + userId, {method: 'GET'})
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
                        alert("Error getting staff")
                    }


                });


        } else {

            fetch('http://localhost:5000/api/customer', {method: 'GET'})
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

                    alert("Error getting customer")

                });

        }

        reset({});


    }

    function display_info(data: any) {
        data = JSON.stringify(data)
        console.log(data)
        reset({
            customerUserDisplay: data
        }, {});

    }

    return (

        <div>

            <h2>Get Customer Account</h2>
            <p>Enter ID of Customer Account to get Customer with Id. If no Id is given, all customers are shown
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerGet)}>
                <input type="text" placeholder="userId" {...register("userId")} />
                <br/>
                <br/>
                <textarea readOnly={true} rows={10} cols={100}
                          placeholder='Staff Member info will be shown here' {...register("staffUserDisplay")} />
                <br/>
                <br/>
                <input type="submit"/>
            </form>

            <br/>
            <br/>


        </div>
    )


}


export default CustomerGet;
