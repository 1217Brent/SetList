import { ChangeEvent, JSX, FormEvent } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase"

interface LoginProps {
    email: string;
    password: string;
}

function Login(): JSX.Element {
    const [input, setInput] = useState<LoginProps>({
        email: "",
        password: "",
    });

    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, input.email, input.password)
            .then((result) => {
                console.log("Login successful:", result);
            }).catch((error) => {
                console.log("Firebase error:", error);
            });
        } catch (error) {
            console.log("Error logging in:", error);
        }
        finally {
            console.log("Navigating to home page");
            // navigate to the next page
        }
    };
    
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;