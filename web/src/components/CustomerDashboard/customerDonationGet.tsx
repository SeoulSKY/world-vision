
import {useAuth} from "../../contexts/AuthContext ";
import {useEffect, useState} from "react";


const CustomerDonationGet = () => {


    const {currentUser} = useAuth();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/donation?customerUserId=" + currentUser.uid)
            .then(response => response.json())
            .then(json => setDonations(json))
            .catch(error => console.log(error));
    });

    return (
        <div>
            <br/>
            <br/>
            <h2>Your Monthly Donations</h2>
            <br/>
            <textarea readOnly={true} rows={10} cols={100}
                      placeholder="Your donations will be shown here" value={JSON.stringify(donations, null, 2)}/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}


export default CustomerDonationGet;
