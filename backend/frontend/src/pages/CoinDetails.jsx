import Navbar from "../components/Navbar";
import SentimentChart from "../components/SentimentChart";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/api";

function CoinDetails() {

    const { symbol } = useParams();

    const [coin, setCoin] = useState(null);
    const [sentiment, setSentiment] = useState(null);
    const [comments, setComments] = useState([]);

    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        loadData();
    }, [symbol]);

    const loadData = () => {

        api.get(`/coins/${symbol}`)
            .then((res) => {
                setCoin(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        api.get(`/coins/${symbol}/sentiment`)
            .then((res) => {
                setSentiment(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        api.get(`/coins/${symbol}/comments`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const submitComment = async () => {

        if (!username || !comment) {
            alert("Please fill all fields");
            return;
        }

        try {

            await api.post("/comments", {
                coin_symbol: symbol,
                username,
                comment
            });

            setUsername("");
            setComment("");

            alert("Comment Added Successfully");

            loadData();

        } catch (error) {

            console.error(error);

            alert("Failed to add comment");
        }
    };

    if (!coin) {

        return (
            <>
                <Navbar />

                <div className="flex justify-center items-center min-h-screen">
                    <h1 className="text-3xl font-bold">
                        Loading...
                    </h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h1 className="text-4xl font-bold">
                            {coin.name}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {coin.symbol.toUpperCase()}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">

                            <div>

                                <p className="text-gray-500">
                                    Current Price
                                </p>

                                <h2 className="text-3xl font-bold text-green-600">
                                    $
                                    {coin.current_price?.toLocaleString()}
                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Market Cap
                                </p>

                                <h2 className="text-2xl font-bold">
                                    $
                                    {coin.market_cap?.toLocaleString()}
                                </h2>

                            </div>

                        </div>

                    </div>

                    {sentiment && sentiment.total_comments > 0 && (

                        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

                            <h2 className="text-2xl font-bold mb-4">
                                Community Sentiment
                            </h2>

                            <p>
                                Total Comments:
                                {" "}
                                {sentiment.total_comments}
                            </p>

                            <p className="text-green-600">
                                Positive:
                                {" "}
                                {sentiment.positive_percentage}%
                            </p>

                            <p className="text-yellow-600">
                                Neutral:
                                {" "}
                                {sentiment.neutral_percentage}%
                            </p>

                            <p className="text-red-600">
                                Negative:
                                {" "}
                                {sentiment.negative_percentage}%
                            </p>

                            <p className="font-bold mt-3">
                                Overall Sentiment:
                                {" "}
                                {sentiment.overall_sentiment}
                            </p>

                            <SentimentChart
                                sentiment={sentiment}
                            />

                        </div>

                    )}

                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Add Comment
                        </h2>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            className="w-full border p-3 rounded mb-3"
                        />

                        <textarea
                            rows="4"
                            placeholder="Write your opinion..."
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }
                            className="w-full border p-3 rounded mb-3"
                        />

                        <button
                            onClick={submitComment}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                        >
                            Submit Comment
                        </button>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Community Comments
                        </h2>

                        {comments.length === 0 ? (

                            <p>
                                No comments yet.
                            </p>

                        ) : (

                            comments.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="border rounded-xl p-4 mb-3"
                                    >

                                        <h3 className="font-bold">
                                            {item.username}
                                        </h3>

                                        <p className="mt-2">
                                            {item.comment}
                                        </p>

                                        <span
                                            className={`inline-block mt-3 px-3 py-1 rounded-full text-white ${
                                                item.sentiment === "positive"
                                                    ? "bg-green-500"
                                                    : item.sentiment === "negative"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                            }`}
                                        >
                                            {item.sentiment}
                                        </span>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default CoinDetails;
