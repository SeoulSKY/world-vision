import {useForm} from 'react-hook-form';


const StaffPut = () => {

    const {register, handleSubmit, reset} = useForm();

    const onSubmitStaffPut = (dataStaffPut: any) => {
        // used to handle put request for staff account

        const data = {
            "userId": dataStaffPut.userId,
            "firstName": dataStaffPut.firstName,
            "middleName": dataStaffPut.middleName,
            "lastName": dataStaffPut.lastName,
            "homeAddress": {
                "street": dataStaffPut.street,
                "city": dataStaffPut.city,
                "province": dataStaffPut.province,
                "postalCode": dataStaffPut.postalCode,
                "country": dataStaffPut.country
            }
        };

        // Put request using fetch with error handling
        fetch('http://localhost:5000/api/staff', {
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

                alert("Error deleting staff")

            });

        reset({});

    }


    return (

        <div>
            <br/>
            <br/>

            <h2>Edit Staff Account Details</h2>
            <p>Enter ID of Staff Account to edit along with any optional field you would like to modify
            </p>

            <form onSubmit={handleSubmit(onSubmitStaffPut)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <input type="text" placeholder="firstName" {...register("firstName")} required/>
                <input type="text" placeholder="middleName" {...register("middleName")} required/>
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


export default StaffPut;
