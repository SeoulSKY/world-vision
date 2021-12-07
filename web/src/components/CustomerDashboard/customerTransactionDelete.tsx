import {useState} from "react";
import {useAuth} from "../../contexts/AuthContext ";

export default function CustomerTransactionDelete() {
    const [recipientUserId, setRecipientUserId] = useState("");
    const {currentUser} = useAuth();

    function deleteTransaction() {
        let params = "customerUserId=" + currentUser.uid
        if (recipientUserId === "") {
            const selectedYes = window.confirm("Are you sure you would like to delete all histories of your transaction?");
            if (!selectedYes) {
                return;
            }
        } else {
            params += "&recipientUserId=" + recipientUserId;

        }

        // clear the input field
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
            <input placeholder={"recipientUserId"} value={recipientUserId} onInput={e => setRecipientUserId((e.target as HTMLInputElement).value)}/>
            <br/>
            <br/>
            <input type={"submit"} onClick={deleteTransaction}/>
            <br/>
            <br/>
        </>
    )
}