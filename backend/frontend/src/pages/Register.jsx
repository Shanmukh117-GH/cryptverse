import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const register = async () => {

        try {

            await api.post(
                "/register",
                {
                    username,
                    email,
                    password
                }
            );

            alert(
                "Registration Successful"
            );

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(
                "Registration Failed"
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                <h1 className="text-3xl font-bold mb-6">
                    Register
                </h1>

                <input
                    placeholder="Username"
                    className="w-full border p-3 rounded mb-3"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-3"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-3"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    onClick={register}
                    className="w-full bg-green-600 text-white p-3 rounded"
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;
