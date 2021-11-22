import {useForm} from 'react-hook-form';


const RecipientPut = () => {

    const {register, handleSubmit, reset} = useForm();


    const onSubmitRecipientPut = (dataRecipientPut: any) => {

        const data = {
            "userId": dataRecipientPut.userId,
            "firstName": dataRecipientPut.firstName,
            "middleName": dataRecipientPut.middleName,
            "lastName": dataRecipientPut.lastName,
            "homeAddress": {
                "street": dataRecipientPut.street,
                "city": dataRecipientPut.city,
                "province": dataRecipientPut.province,
                "postalCode": dataRecipientPut.postalCode,
                "country": dataRecipientPut.country
            },
            "birthDate": dataRecipientPut.birthDate,
            "gender": dataRecipientPut.gender,
            "description": dataRecipientPut.recipientDescriptionPut
        }

        // Post request using fetch with error handling
        fetch('http://localhost:5000/api/recipient', {
            method: 'PUT',
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

                alert("Error putting recipient")

            })

        reset({});
    }


    return (


        <div>

            <br/>
            <br/>

            <h2>Edit Recipient Account</h2>
            <p>Enter recipient Id and any information to modify</p>

            <form onSubmit={handleSubmit(onSubmitRecipientPut)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <br/>
                <br/>
                <input type="text" placeholder="firstName" {...register("firstName")} required/>
                <input type="text" placeholder="middleName" {...register("middleName")} required/>
                <input type="text" placeholder="lastName" {...register("lastName")} required/>
                <input type="text" placeholder="gender" {...register("gender")} required/>
                <p>Birthdate</p>
                <input type="date" id="start" {...register("birthDate")} required/>
                <br/>
                <br/>

                <input type="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
                <input type="text" placeholder="street" {...register("street")} required/>
                <input type="text" placeholder="city" {...register("city")} required/>
                <input type="text" placeholder="province" {...register("province")} required/>
                <input type="text" placeholder="postalCode" {...register("postalCode")} required/>
                <input type="text" placeholder="country" {...register("country")} required/>
                <br/>

                <br/>
                <textarea rows={10} cols={100} placeholder='Description' {...register("recipientDescriptionPut")}
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


export default RecipientPut;
