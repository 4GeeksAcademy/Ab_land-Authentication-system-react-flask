import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = ({ action }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const objToSend = {
        email: email.trim(),
        password: password.trim()
    };

    function postSingUP() {
        const backendUrl = import.meta.env.VITE_BACKEND_URL        

        fetch(`${backendUrl}/singup`, {
            method: "POST",
            body: JSON.stringify(objToSend),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}, ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
            })
    };

    const postLogIn = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            
            const response = await fetch(backendUrl + "/login",
                {
                    method: "POST",
                    body: JSON.stringify(objToSend),
                    headers: { "Content-Type": "application/json" }
                }
            )
            console.log('this in response', response);
            if (!response.ok) throw Error("There was a problem in the login request")

            const data = await response.json()

            if (data.token) { localStorage.setItem("jwt-token", data.token) };

            navigate('/private');
        }
        catch (error) {
            console.error(error);

        }
    }

    function handleButton(action) {
        if (email && password !== "") {
            if (action == "SingUp") {
                postSingUP()
            }
            if (action == "LogIn") {
                postLogIn()
            }
        }
    }

    return (

        <form >
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="Email" className="form-control" id="email"
                    onChange={(e) => setEmail(e.target.value)} value={email} />

            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                    onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            {/*<div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>*/}
            <div className="d-flex">
                <button className="btn btn-outline-primary btn-sm mx-auto" onClick={(e) => { e.preventDefault(), handleButton(action) }}>Submit</button>
            </div>
        </form>

    )
}
