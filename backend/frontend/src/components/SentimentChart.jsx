import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function SentimentChart({ sentiment }) {

    if (!sentiment) return null;

    const data = [
        {
            name: "Positive",
            value: sentiment.positive_percentage
        },
        {
            name: "Neutral",
            value: sentiment.neutral_percentage
        },
        {
            name: "Negative",
            value: sentiment.negative_percentage
        }
    ];

    const COLORS = [
        "#22c55e",
        "#eab308",
        "#ef4444"
    ];

    return (
        <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
                Sentiment Breakdown
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}

                    </Pie>

                    <Tooltip />
                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default SentimentChart;
