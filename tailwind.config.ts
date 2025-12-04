import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                foreground: "#e0e0e0",
                primary: "#7b2cbf",
                secondary: "#4895ef",
                card: "rgba(255, 255, 255, 0.05)",
                "card-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                sans: ['var(--font-outfit)'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "accent-gradient": "linear-gradient(135deg, #7b2cbf, #3a0ca3)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
