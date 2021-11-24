import {useForm} from 'react-hook-form';

const RecipientGet = () => {

    const {register, handleSubmit, reset, resetField} = useForm();


    const onSubmitRecipientGet = (dataRecipientGet: any) => {
        // used to handle get request for recipient account
        let userId = dataRecipientGet.userId

        // if empty id return all recipients
        if (userId !== "") {

            fetch('http://localhost:5000/api/recipient?recipientUserId=' + userId, {method: 'GET'})
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
                        alert("No recipient with specified userId")
                    } else {
                        alert("Error getting recipients: " +error)
                    }


                });


        } else {
            // return recipient with specified userId
            fetch('http://localhost:5000/api/recipient', {method: 'GET'})
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

                    alert("Error getting recipients: " +error)

                });

        }

        // reset Form
        for (var key in dataRecipientGet) {
            resetField(key);
        }
        reset({});



    }

    function display_info(data: JSON) {
        // display info of recipient
        const toDisplay = JSON.stringify(data, null, 2);

        console.log(toDisplay)
        reset({
            recipientUserDisplay: toDisplay
        }, {});

    }


    return (


        <div>

            <br/>
            <br/>
            <h2>Get Recipient Account</h2>
            <p>Enter ID of Recipient Account to get Recipient information. If no Id is given all recipients will be
                displayed
            </p>

            <form onSubmit={handleSubmit(onSubmitRecipientGet)}>
                <input type="text" placeholder="userId" {...register("userId")} />
                <br/>
                <br/>
                <textarea readOnly={true} rows={10} cols={100}
                          placeholder='Recipient info will be shown here' {...register("recipientUserDisplay")} />
                <br/>
                <br/>
                <input type="submit"/>
            </form>
            <br/>
            <br/>


        </div>
    )


}


export default RecipientGet;
