import { useState } from "react"
import "./login.css"


interface Props {
    loginReturn : (tokenOrError: Token) => void
}

interface Token {
    token:string
}

function Login(props: Props) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const fetchLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username":email,
                "password":password
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    alert("Invalid email or password!")
                    throw new Error(err.message || "Login failed");
                });
            }
            return res.json();
        })
        .then(data => {
            props.loginReturn(data)
            localStorage.setItem("token", `Bearer ${data.token}`);
            setEmail("");
            setPassword("");
        })
        .catch(error => {
            console.error("An error occurred:", error.message);
        });
    }

  return (
    <div className="formDiv">
        <form onSubmit={fetchLogin}>
            <input placeholder="@Email" className="emailInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" className="passwordInput" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Log in</button>
        </form>
        
    </div>
  )
}

export default Login