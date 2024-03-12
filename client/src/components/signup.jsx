//import { useForm } from "react-hook-form";
//import { useState } from "react"; 
import './auth.css';

function SignUpForm(){
    

    return (
        <div className="container">
            <form className="signUpForm">
                <h3 className="signUpH3">SIGN UP</h3>
                <div className="mb-4">
                    <input
                        type="name"
                        className="form-control"
                        placeholder="Name"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="E-mail"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="address"
                        className="form-control"
                        placeholder="Adress"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="birthday"
                        className="form-control"
                        placeholder="AAAA/MM/DD"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="phone"
                        className="form-control"
                        placeholder="(xxx)xxx-xxxx"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                    />
                </div>
                <div className="d-grid">
                    <button className="signUpButton">
                        SIGN-UP
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;