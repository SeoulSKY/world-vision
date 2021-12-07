import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext ";

export default function() {
    const [transactions, setTransactions] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        fetch("http://localhost:5000/api/transaction?customerUserId=" + currentUser.uid)
            .then(response => response.json())
            .then(json => setTransactions(json))
            .catch(error => console.log(error));
    });

    return (
        <div>
            <br/>
            <br/>
            <h2>Your Transactions</h2>
            <br/>
            <textarea readOnly={true} rows={10} cols={100}
                      placeholder="Your transaction will be shown here" value={JSON.stringify(transactions, null, 2)}/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}