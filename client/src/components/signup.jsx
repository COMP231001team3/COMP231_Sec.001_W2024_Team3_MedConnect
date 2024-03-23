//import { useForm } from "react-hook-form";
import { useState } from "react"; 
import './auth.css';

function SignUpForm(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); 
    const [errorMsg, setErrorMsg] = useState('');

   
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !email || !address || !birthday || !phone || !password || !selectedRole) {
            setErrorMsg("Please fill in all fields");
            return;
        }
        setErrorMsg('');
        console.log("Form submitted successfully");
        
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };


    return (
        <div className="container" >
             <form className="signUpForm" onSubmit={handleSubmit}>
                <h3 className="signUpH3">SIGN UP</h3>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="checkbox"
                        id="patient"
                        name="role"
                        value="patient"
                        checked={selectedRole === "patient"}
                        onChange={handleRoleChange}
                        className="checkBox"
                    />
                    <label htmlFor="patient"> Patient</label>
                    <input
                        type="checkbox"
                        id="doctor"
                        name="role"
                        value="doctor"
                        checked={selectedRole === "doctor"}
                        onChange={handleRoleChange}
                        className="checkBox"
                    />
                    <label htmlFor="doctor"> Doctor</label>
                    <input
                        type="checkbox"
                        id="receptionist"
                        name="role"
                        value="receptionist"
                        checked={selectedRole === "receptionist"}
                        onChange={handleRoleChange}
                        className="checkBox"
                    />
                    <label htmlFor="receptionist">Receptionist</label>
                </div>

                <div className="mb-4">
                    <input
                        type="text" 
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date" 
                        className="form-control"
                        placeholder="Birthday: AAAA/MM/DD"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="tel" 
                        className="form-control"
                        placeholder="(xxx)xxx-xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="signUpButton">
                        SIGN-UP
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;