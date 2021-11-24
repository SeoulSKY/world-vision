const {useForm} = require('react-hook-form');
const {useState} = require("react")


export default function ContactUsPage() {
    const {register, handleSubmit, reset} = useForm();
    const [buttonText, setButtonText] = useState("Send");

    function onSubmit(data: any) {
        setButtonText("Sending...")

        fetch("http://localhost:5001/mail/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 201) {
                alert("An email has been sent. Thank you for contacting us, we will respond shortly.")
            } else {
                console.log(response);
                alert("Failed to send the email. Please try again.")
            }

            reset();
        }).catch(err => {
            console.log(err);
            alert("Failed to send the email. Please try again.")
        }).finally(() => {
            setButtonText("Send");
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <br/>
            <input type="email" placeholder="Your email address" size={40} {...register("senderEmail")}/> <br/><br/>
            <input id="title" placeholder="Title" size={40} {...register("title")}/> <br/><br/>
            <textarea id="message" placeholder="Your concern" rows={20} cols={50} {...register("message")} /> <br/><br/>
            <button> {buttonText} </button>
        </form>
    )
}