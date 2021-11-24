import React from "react";
import { useForm } from 'react-hook-form';

const CustomerForm = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any)=> {
        console.log(data)
    }
    return (
        <div className="customerForm">
            <h1> Customer Form </h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label>  Customer User ID: </label>
                <input type ="text" required {...register("customerUserId")}/>
                <label>  First name: </label>
                <input type ="text" required {...register("firstName")}/>
                <label>  Middle name: </label>
                <input type ="text" {...register("middleName")}/>
                <label>  Last name: </label>
                <input type ="text" required {...register("lastName")}/>
                <br/>

                <h2>Enter Card Information</h2>
                <br/>
                <label>  Card Number: </label>
                <input type ="text" required {...register("cardNumber")}/>
                <label>  Expiration Date: </label>
                <input type ="text" required {...register("expirationDate")}/>
                <label>  CVV: </label>
                <input type ="text" required {...register("CVV")}/>
                <br/>

                <h2>Enter billing address</h2>
                <br/>
                <label>  Building Number: </label>
                <input type ="text" required {...register("buildingNumber")} />
                <label>  Street: </label>
                <input type ="text" required {...register("street")} />
                <label>  City: </label>
                <input type ="text" required {...register("city")} />
                <label>  Province: </label>
                <input type ="text" required {...register("province")}/>
                <label>  Postal Code: </label>
                <input type ="text" required {...register("postalCode")}/>
                <label>  Country: </label>
                <input type ="text" required {...register("country")} />
                <br/>

                <h2>Enter donation information</h2>
                <br/>
                <label>  Donation ID: </label>
                <input type ="text" required {...register("donationID")} />
                <label>  Recipient User ID: </label>
                <input type ="text" required {...register("recipientUserId")} />
                <label>  Monthly Transaction Amount: </label>
                <input type ="text" {...register("monthlyTransactionAmount")} />
                <label>  Next Transaction Date: </label>
                <input type ="text" {...register("nextTransactionDate")}/>
                <label>  Optional Transaction Amount: </label>
                <input type ="text" {...register("optionalTransactionAmount")}/>
                <br/>
                <br/>
                <input type="submit" />
            </form>
        </div>
    );
}

export default CustomerForm;