import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/api";
import { saveToken } from "../utils/auth";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response = await api.post(
                "/login",
                {
                    email,
                    password
                }
            );

            console.log(
                "Login Response:",
                response.data
            );

            if (
                !response.data.access_token
            ) {
                alert(
                    "No token received from server"
                );
                return;
            }

            saveToken(
                response.data.access_token
            );

            console.log(
                "Saved Token:",
                localStorage.getItem(
                    "token"
                )
            );

            alert(
                "Login Successful"
            );

            navigate("/");

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            alert(
                "Invalid Credentials"
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-3"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={login}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
                >
                    Login
                </button>

                <p className="text-center mt-4">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;