import React, { useState } from "react";
import "../global.css";
import SpotSolve from "../img/bgf.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in all fields", { autoClose: 3000 });
            setIsSubmitting(false);
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address", { autoClose: 3000 });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Store token and user data in localStorage
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            // Trigger storage event to update navbar
            window.dispatchEvent(new Event("storage"));

            toast.success("Login successful! Redirecting...", { autoClose: 2000 });

            // Clear form and redirect immediately
            setEmail("");
            setPassword("");
            navigate('/'); // Redirect to home/dashboard

        } catch (err) {
            toast.error(err.message || "Invalid email or password", { autoClose: 5000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signin">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <img className="signUpLogo" src={SpotSolve} alt="SpotSolve Logo" />
                    <p className="loginPara">
                        Sign in to view and manage<br />
                        community issues
                    </p>

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

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="form2">
                    Don't have an account? 
                    <Link to="/signup">
                        <span className="signin-link">Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}