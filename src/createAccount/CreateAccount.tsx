import { useState } from 'react'

function createAccount() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const submitCreateAccount = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        fetch("http://localhost:8080/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    alert("Somethinfg went wrong, try again.")
                    throw new Error(err.message || "Account creation failed");
                });
            }
            return res.json();
        })
        .then(data => {
            setSuccessMessage(data.username + ", account created. Now you can log in!");
            setEmail("");
            setPassword("");
        })
        .catch(error => {
            console.error("An error occurred:", error.message);
        });
    }

    
  return (
    <>
        <form onSubmit={submitCreateAccount}>
            <input placeholder="@Email" className="emailInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" className="passwordInput" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Create Account</button>
        </form>
        <h3>{successMessage}</h3>
    </>

  )
}

export default createAccount