import { useState } from "react"


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

        console.log("suername, ", email)
        console.log("pasword, ", password)
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
                    throw new Error(err.message || "Login failed");
                });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful", data);
            props.loginReturn(data)
            localStorage.setItem("token", `Bearer ${data.token}`);
        })
        .catch(error => {
            console.error("An error occurred:", error.message);
        });
    }

  return (
    <div>
        <form onSubmit={fetchLogin}>
            <input placeholder="email" className="emailInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="password" className="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Log in</button>
        </form>
        
    </div>
  )
}

export default Login