import {useState} from "react";
import {useAuth} from "../../contexts/AuthContext ";

export default function CustomerTransactionPost() {
    const [recipientUserId, setRecipientUserId] = useState("");
    const [amount, setAmount] = useState(0.0);

    const {currentUser} = useAuth();

    function sendTransaction() {
        if (recipientUserId === "") {
            alert("Please enter the recipientUserId");
            return;
        } else if (amount === 0.0) {
            alert("Please enter the amount");
            return;
        }

        const body = {
            customerUserId: currentUser.uid,
            recipientUserId: recipientUserId,
            amount: amount
        }

        // clear the field
        setRecipientUserId("");
        setAmount(0.0);

        fetch("http://localhost:5000/api/transaction", {
            "method": "POST",
            "body": JSON.stringify(body),
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw recipientUserId + " is not found from the list of recipients."
                }
                alert("Thank you for your transaction.")
            })
            .catch(err => {
                alert(err);
            });
    }

    return (
        <>
            <h2>Make an optional donation</h2>
            <br/>
            <input placeholder={"recipientUserId"} value={recipientUserId} onInput={e => setRecipientUserId((e.target as HTMLInputElement).value)}/>
            <input type={"number"} placeholder={"amount"} value={amount} onInput={e => setAmount(Number((e.target as HTMLInputElement).value))}/>
            <br/>
            <br/>
            <input type={"submit"} onClick={sendTransaction}/>
            <br/>
            <br/>
        </>
    )
}