import {useForm} from 'react-hook-form';


const CustomerPost = () => {

    const {register, handleSubmit, reset} = useForm();


    const onSubmitCustomerPost = (dataCustomerPost: any) => {
        // used to handle post request for customer account
        const data = {
            "userId": dataCustomerPost.userId,
            "firstName": dataCustomerPost.firstName,
            "middleName": dataCustomerPost.middleName,
            "lastName": dataCustomerPost.lastName,
            "homeAddress": {
                "buildingNumber": dataCustomerPost.buildingNumber,
                "street": dataCustomerPost.street,
                "city": dataCustomerPost.city,
                "province": dataCustomerPost.province,
                "postalCode": dataCustomerPost.postalCode,
                "country": dataCustomerPost.country
            }
        };

        // Post request using fetch with error handling
        fetch('http://localhost:5000/api/customer', {
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

                alert("Error posting customer")

            });


        reset({});

    }


    return (

        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Create New Customer Account</h2>
            <p>Enter Customer Personal Details</p>

            <form onSubmit={handleSubmit(onSubmitCustomerPost)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <input type="text" placeholder="firstName" {...register("firstName")} required/>
                <input type="text" placeholder="middleName" {...register("middleName")} />
                <input type="text" placeholder="lastName" {...register("lastName")} required/>
                <br/>
                <br/>
                <p>Enter customer billing address</p>
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


export default CustomerPost;
