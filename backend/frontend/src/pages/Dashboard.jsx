import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        api.get("/coins")
            .then((res) => {
                setCoins(res.data);
            })
            .catch((err) => {
                console.error(
                    "Error loading coins:",
                    err
                );
            });

    }, []);

    const filteredCoins = coins.filter(
        (coin) =>
            coin.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||
            coin.symbol
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );

    return (
        <>
            <Navbar />
            <div className="bg-white dark:bg-black text-black dark:text-white p-6 rounded mb-4">
    DARK MODE TEST
</div>

           <div className="min-h-screen bg-gray-100 dark:bg-black p-8">

                <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
                    🚀 CryptVerse Dashboard
                </h1>

                {/* Stats Cards */}

                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <h3 className="text-gray-500">
                            Total Coins
                        </h3>

                        <p className="text-3xl font-bold">
                            {coins.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-gray-500">
                            Highest Price
                        </h3>

                        <p className="text-3xl font-bold text-green-600">
                            $
                            {coins.length > 0
                                ? Math.max(
                                      ...coins.map(
                                          (c) =>
                                              c.current_price
                                      )
                                  ).toLocaleString()
                                : 0}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-gray-500">
                            Market Status
                        </h3>

                        <p className="text-3xl font-bold text-blue-600">
                            Live
                        </p>
                    </div>

                </div>

                {/* Trending Coins */}

                <div className="mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        🔥 Trending Coins
                    </h2>

                    <div className="flex gap-3 flex-wrap">

                        {coins
                            .slice(0, 5)
                            .map((coin) => (

                                <Link
                                    key={coin.symbol}
                                    to={`/coin/${coin.symbol}`}
                                >
                                    <div className="bg-orange-100 px-4 py-2 rounded-full hover:bg-orange-200 transition">

                                        {coin.name}

                                    </div>
                                </Link>

                            ))}

                    </div>

                </div>

                {/* Search Bar */}

                <div className="max-w-2xl mx-auto mb-8">

                    <input
                        type="text"
                        placeholder="Search by coin name or symbol..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full p-4 rounded-xl border shadow-sm"
                    />

                </div>

                {/* Coin Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredCoins.map(
                        (coin) => (

                            <Link
                                key={coin.symbol}
                                to={`/coin/${coin.symbol}`}
                            >

                                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 cursor-pointer">

                                    <h2 className="text-2xl font-bold">
                                        {coin.name}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {coin.symbol.toUpperCase()}
                                    </p>

                                    <p className="text-3xl font-bold mt-4 text-green-600">
                                        $
                                        {coin.current_price?.toLocaleString()}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-3">
                                        Market Cap
                                    </p>

                                    <p className="font-semibold">
                                        $
                                        {coin.market_cap?.toLocaleString()}
                                    </p>

                                </div>

                            </Link>

                        )
                    )}

                </div>

            </div>
        </>
    );
}

export default Dashboard;
