import { Link, useNavigate } from "react-router-dom";

import { logout } from "../utils/auth";
import { toggleTheme } from "../utils/theme";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (

        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">

            <Link
                to="/"
                className="font-bold text-xl"
            >
                🚀 CryptVerse
            </Link>

            <div className="flex items-center gap-3">

                <Link
                    to="/profile"
                    className="hover:text-gray-300"
                >
                    Profile
                </Link>

               <button
    onClick={() => {
        console.log("BUTTON CLICKED");
        toggleTheme();
    }}
    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
>
    🌙
</button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;