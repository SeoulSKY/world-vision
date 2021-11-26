import {useState} from "react";

export default function CustomerTransactionDelete() {
    const [customerUserId, setCustomerUserid] = useState("");
    const [recipientUserId, setRecipientUserId] = useState("");

    function deleteTransaction() {
        let params = "customerUserId=" + customerUserId;
        if (recipientUserId === "") {
            const selectedYes = window.confirm("Are you sure you would like to delete all histories of your transaction?");
            if (!selectedYes) {
                return;
            }
        } else {
            params += "&recipientUserId=" + recipientUserId;
        }


        // clear the input field
        setCustomerUserid("");
        setRecipientUserId("");

        fetch("http://localhost:5000/api/transaction?" + params, {method: "DELETE"})
            .then(() => alert("Deleted"))
            .catch(err => {
               console.log(err);
               alert("Failed to delete the transaction.");
            });
    }

    return (
        <>
            <h2>Delete your Transactions</h2>
            <br/>
            <p>Enter ID of recipient account to delete all transaction histories to the recipient. If no Id is given, all of your transaction histories will be deleted</p>
            <input placeholder={"customerUserId"} value={customerUserId} onInput={e => setCustomerUserid(e.target.value)}/>
            <input placeholder={"recipientUserId"} value={recipientUserId} onInput={e => setRecipientUserId(e.target.value)}/>
            <br/>
            <br/>
            <input type={"submit"} onClick={deleteTransaction}/>
            <br/>
            <br/>
        </>
    )
}