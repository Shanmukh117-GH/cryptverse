import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        api.get("/profile", {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        })
        .then((res) => {
            setUser(res.data.user);
        })
        .catch((err) => {
            console.error(err);
        });

    }, []);

    if (!user) {

        return (
            <>
                <Navbar />

                <div className="p-10">
                    Loading...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold mb-6">
                        User Profile
                    </h1>

                    <div className="mb-4">

                        <p className="text-gray-500">
                            Username
                        </p>

                        <p className="text-xl font-semibold">
                            {user.username}
                        </p>

                    </div>

                    <div className="mb-4">

                        <p className="text-gray-500">
                            Email
                        </p>

                        <p className="text-xl font-semibold">
                            {user.email}
                        </p>

                    </div>

                    <div>

                        <p className="text-gray-500">
                            Status
                        </p>

                        <p className="text-green-600 font-bold">
                            Active
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Profile;