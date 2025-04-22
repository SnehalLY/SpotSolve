import React, { useState } from "react";
import SpotSolve from "../img/bgf.png";
import "../global.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Check for empty fields first
        if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
            toast.error("Please fill in all fields", {
                autoClose: 3000,
                hideProgressBar: false
            });
            setIsSubmitting(false);
            return;
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address", {
                autoClose: 3000,
                hideProgressBar: false
            });
            setIsSubmitting(false);
            return;
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)", {
                autoClose: 5000,
                hideProgressBar: false
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    userName: username,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                const errorMsg = data.error?.includes("E11000") 
                    ? "Email or username already exists" 
                    : data.error || "Registration failed";
                throw new Error(errorMsg);
            }
            
            toast.success("Registration successful! Redirecting...", {
                autoClose: 3000,
                hideProgressBar: false
            });

            // Clear form fields
            setName("");
            setUsername("");
            setEmail("");
            setPassword("");

            // Redirect after delay
            setTimeout(() => {
                window.location.href = '/signin';
            }, 3000);
            
        } catch (err) {
            toast.error(err.message || "An error occurred during registration", {
                autoClose: 5000,
                hideProgressBar: false
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signUp">
           <div className="form-container">
                {/* Added noValidate attribute here */}
                <form className="form" onSubmit={handleSubmit} noValidate>
                    <img className="signUpLogo" src={SpotSolve} alt="SpotSolve Logo" />
                    <p className="loginPara">
                        Sign-Up to see or post <br /> issues nearby you
                    </p>

                    {/* Form fields remain the same */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group password-container">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <p className="loginPara terms">
                        By signing up, you agree to our Terms, <br /> privacy policy and cookies policy.
                    </p>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <div className="form2">
                    Already have an account?
                    <Link to="/signin">
                        <span className="signin-link">Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
   