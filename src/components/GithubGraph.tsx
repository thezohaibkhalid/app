"use client";
import GitHubCalendar from "react-activity-calendar";
import { useEffect, useState } from "react";

export default function GithubGraph() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching data from a public API that scrapes GitHub contributions
        fetch("https://github-contributions-api.jogruber.de/v4/thezohaibkhalid?y=last")
            .then((response) => response.json())
            .then((json) => {
                setData(json.contributions);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching GitHub data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading GitHub Activity...</div>;
    }

    if (!data) {
        return <div className="text-center text-red-500">Failed to load GitHub Activity.</div>;
    }

    return (
        <div className="w-full flex justify-center overflow-x-auto">
            <GitHubCalendar
                data={data}
                theme={{
                    light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
                labels={{
                    totalCount: "{{count}} contributions in the last year",
                }}
                colorScheme="dark"
            />
        </div>
    );
}
