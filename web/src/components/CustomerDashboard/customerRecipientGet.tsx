import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext ";


const CustomerRecipientGet = () => {
    const [recipients, setRecipients] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        fetch('http://localhost:5000/api/recipient?customerUserId=' + currentUser.uid)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (response.ok) {
                    setRecipients(data);
                }
            })
            .catch(error => {
                if (error !== 404) {
                    throw error;
                }
            });
    }, []);

    return (
        <div>
            <br/>
            <br/>
            <h2>Your Recipients</h2>
            <br/>
            <textarea readOnly={true} rows={10} cols={100}
                      placeholder="Customer's recipients will be shown here" value={JSON.stringify(recipients)}/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default CustomerRecipientGet;
