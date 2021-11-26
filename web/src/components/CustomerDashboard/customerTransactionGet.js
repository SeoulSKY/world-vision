import {useEffect, useState} from "react";

export default function() {
    const [transactions, setTransactions] = useState([]);
    const [customerUserId, setCustomerUserid] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/transaction?customerUserId=" + customerUserId)
            .then(response => response.json())
            .then(json => setTransactions(json))
            .catch(error => alert(error));
    });

    return (
        <div>
            <br/>
            <br/>
            <h2>Enter your user Id to see the transactions</h2>
            <br/>
            <input placeholder={"customerUserId"} value={customerUserId} onInput={e => setCustomerUserid(e.target.value)}/>
            <textarea readOnly={true} rows={10} cols={100}
                      placeholder="Your transaction will be shown here" value={JSON.stringify(transactions, null, 2)}/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}