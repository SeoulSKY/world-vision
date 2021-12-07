import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext ";


const CustomerRecipientGet = () => {
    const [recipients, setRecipients] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        fetch("http://localhost:5000/api/recipient?customerUserId=" + currentUser.uid)
            .then(response => response.json())
            .then(json => setRecipients(json))
            .catch(error => setRecipients([]));
    });

    return (
        <div>
            <br/>
            <br/>
            <h2>Your Recipients</h2>
            <br/>
            <textarea readOnly={true} rows={10} cols={100}
                      placeholder="Customer's recipients will be shown here" value={JSON.stringify(recipients, null, 2)}/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default CustomerRecipientGet;
