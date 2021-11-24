import {useForm} from 'react-hook-form';


const RecipientPost = () => {

    const {register, handleSubmit, reset, resetField} = useForm();


    const onSubmitRecipientPost = (dataRecipientPost) => {
        // used to handle post request for recipient account
        const data = {
            "userId": dataRecipientPost.userId,
            "firstName": dataRecipientPost.firstName,
            "middleName": dataRecipientPost.middleName,
            "lastName": dataRecipientPost.lastName,
            "homeAddress": {
                "buildingNumber": dataRecipientPost.buildingNumber,
                "street": dataRecipientPost.street,
                "city": dataRecipientPost.city,
                "province": dataRecipientPost.province,
                "postalCode": dataRecipientPost.postalCode,
                "country": dataRecipientPost.country
            },
            "birthDate": dataRecipientPost.birthDate,
            "gender": dataRecipientPost.gender,
            "description": dataRecipientPost.recipientDescriptionPost
        }

        // Post request using fetch with error handling
        fetch('http://localhost:5000/api/recipient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

                alert("Error posting recipient: " + error)

            })

        // reset Form
        for (var key in dataRecipientPost) {
            resetField(key);
        }
        reset({});

    }


    return (


        <div>
            <br/>
            <br/>

            <h2>Create New Recipient Account</h2>
            <p>Enter recipient personal details</p>

            <form onSubmit={handleSubmit(onSubmitRecipientPost)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <input type="text" placeholder="firstName" {...register("firstName")} required/>
                <input type="text" placeholder="middleName" {...register("middleName")} />
                <input type="text" placeholder="lastName" {...register("lastName")} required/>
                <input type="text" placeholder="gender" {...register("gender")} required/>


                <p>Birthdate</p>
                <input type="date" id="start" {...register("birthDate")} required/>
                <br/>
                <br/>

                <br/>
                <p>Enter recipient home address</p>
                <br/>
                <input type="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
                <input type="text" placeholder="street" {...register("street")} required/>
                <input type="text" placeholder="city" {...register("city")} required/>
                <input type="text" placeholder="province" {...register("province")} required/>
                <input type="text" placeholder="postalCode" {...register("postalCode")} required/>
                <input type="text" placeholder="country" {...register("country")} required/>
                <br/>

                <p>Enter recipient description</p>
                <br/>
                <textarea rows={10} cols={100} placeholder='Description' {...register("recipientDescriptionPost")}
                          required/>

                <br/>
                <br/>
                <input type="submit"/>


            </form>

            <br/>
            <br/>


        </div>
    )


}


export default RecipientPost;
