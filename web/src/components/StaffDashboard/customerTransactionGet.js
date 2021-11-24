import {useForm} from 'react-hook-form';


const CustomerTransactionGet = () => {

    const {register, handleSubmit, reset, resetField} = useForm();


    const onSubmitCustomerTransactionGet = (dataCustomerGet) => {

        // used to handle get request for getting customers transactions
        let userId = dataCustomerGet.userId

        fetch('http://localhost:5000/api/transaction?customerUserId=' + userId, {method: 'GET'})
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
                    alert('Invalid customer id')
                } else {
                    alert("Error getting transactions of customer: " + error)
                }


            });


        // reset Form
        for (var key in dataCustomerGet) {
            resetField(key);
        }
        reset({});



    }

    function display_info(data) {

        // display info of recipient
        const toDisplay = JSON.stringify(data, null, 2);

        console.log(toDisplay)
        reset({
            customerTransactions: toDisplay
        }, {});

    }


    return (


        <div>

            <br/>
            <br/>
            <h2>Get Customer Transactions</h2>
            <p>Enter ID of Customer Account to get the Customer's transactions.
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerTransactionGet)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <br/>
                <br/>
                <textarea readOnly={true} rows={10} cols={100}
                          placeholder="Customer's transactions will be shown here" {...register("customerTransactions")} />
                <br/>
                <br/>
                <input type="submit"/>
            </form>
            <br/>
            <br/>


        </div>
    )


}


export default CustomerTransactionGet;
