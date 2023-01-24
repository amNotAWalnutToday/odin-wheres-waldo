import { useEffect, useState } from "react";

const TopScores = ( {allHighscores, parseTime} ) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const receive = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(receive);
    }, []);

    const scoreMap = () => {
        return allHighscores.map((item, i) => {
            return (
                <li key={i}>{item.name}{parseTime(item.timeTaken)}</li>
            )
        });
    }

    return (
        <ul>
            <li>hi</li>
            {loading ? undefined : scoreMap() }
        </ul>
    )
}

export default TopScores;
