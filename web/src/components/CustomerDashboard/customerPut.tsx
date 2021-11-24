import {useForm} from 'react-hook-form';


const CustomerPut = () => {

    const {register, handleSubmit, reset} = useForm();

    const onSubmitCustomerPut = (dataCustomerPut: any) => {
        // used to handle put request for customer account

        const data = {
            "userId": dataCustomerPut.userId,
            "firstName": dataCustomerPut.firstName,
            "middleName": dataCustomerPut.middleName,
            "lastName": dataCustomerPut.lastName,
            "homeAddress": {
                "buildingNumber": dataCustomerPut.buildingNumber,
                "street": dataCustomerPut.street,
                "city": dataCustomerPut.city,
                "province": dataCustomerPut.province,
                "postalCode": dataCustomerPut.postalCode,
                "country": dataCustomerPut.country
            }
        };

        // Put request using fetch with error handling
        fetch('http://localhost:5000/api/customer', {
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

                alert("Error changing customer")

            });

        reset({});

    }


    return (

        <div>
            <br/>
            <br/>

            <h2>Edit Customer Account Details</h2>
            <p>Enter ID of Customer Account to edit along with any optional field you would like to modify
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerPut)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <input type="text" placeholder="firstName" {...register("firstName")} required/>
                <input type="text" placeholder="middleName" {...register("middleName")} />
                <input type="text" placeholder="lastName" {...register("lastName")} required/>
                <br/>
                <input type="text" placeholder="buildingNumber" {...register("buildingNumber")} required/>
                <input type="text" placeholder="street" {...register("street")} required/>
                <input type="text" placeholder="city" {...register("city")} required/>
                <input type="text" placeholder="province" {...register("province")} required/>
                <input type="text" placeholder="postalCode" {...register("postalCode")} required/>
                <input type="text" placeholder="country" {...register("country")} required/>
                <br/>
                <br/>
                <input type="submit"/>

            </form>
            <br/>
            <br/>

        </div>
    )


}


export default CustomerPut;
