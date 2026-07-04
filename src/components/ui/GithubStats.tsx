"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

interface GithubData {
    public_repos: number;
    followers: number;
    stars?: number; // Not directly available on user endpoint, might need a separate fetch or mock
}
interface GithubStatsProps {
    username: string;
}

export function GithubStats({ username }: GithubStatsProps) {
    const [data, setData] = useState<GithubData | null>(null);

    useEffect(() => {
        if (!username) return;
        
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => {
                if (!res.ok) throw new Error('User not found');
                return res.json();
            })
            .then((userData) => {
                setData({
                    public_repos: userData.public_repos,
                    followers: userData.followers,
                });
            })
            .catch((err) => console.error("Failed to fetch GitHub data", err));
    }, [username]);

    return (
        <div className="flex flex-col h-full">
            <Github className="w-8 h-8 mb-4 lg:w-10 lg:h-10 transition-colors duration-300 group-hover:text-[#8b5cf6]" style={{ color: "#8b5cf6" }} />

            <div className="flex-1 flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>GitHub</h3>

                {data ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 mt-2 text-sm"
                        style={{ color: "var(--foreground-muted)" }}
                    >
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-white">{data.public_repos}</span> Repos
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-white">{data.followers}</span> Followers
                        </div>
                    </motion.div>
                ) : (
                    <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                        Check out open-source work.
                    </p>
                )}
            </div>
        </div>
    );
}
