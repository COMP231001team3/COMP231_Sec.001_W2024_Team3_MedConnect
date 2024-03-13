import { useForm } from "react-hook-form";
import { useState } from "react"; 
import './auth.css';

function LoginForm(){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const [passwordError, setPasswordError] = useState(false); 
    
      const onSubmit = (data) => {
        if (data.password !== "password") {
          setPasswordError(true);
          alert(`Your password ${data.password} is invalid`);
        } else {
          setPasswordError(false);
          console.log(data);
          alert(`${data.email} is logged in!`);
        }
      };
    return (
        <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>LOGIN</h3>
                    <div className="mb-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && (<p>Email is required and must be valid</p>)}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <p>Password is required</p>}
                    </div>
                    <div className="mb-4">
                        <div className="containerAlign">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    Remember me
                                </label>
                            </div>
                            <p>Forgot password?</p>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button>
                            LOGIN
                        </button>
                    </div>
                    <p className="register">Don't have an account yet? <a href="/sign-up">Register</a> now!</p>
                </form>
            </div>
    )
}

export default LoginForm;
