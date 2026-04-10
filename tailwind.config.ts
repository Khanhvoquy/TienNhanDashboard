import type { Config } from "tailwindcss";
const config: Config = {
content: [
"./src/pages//*.{js,ts,jsx,tsx,mdx}",
"./src/components//.{js,ts,jsx,tsx,mdx}",
"./src/app/**/.{js,ts,jsx,tsx,mdx}",
],
darkMode: "class",
theme: {
extend: {
colors: {
background: "var(--color-bg-deep)",
surface: "var(--color-bg-surface)",
panel: "var(--color-bg-panel)",
realm: {
fan: "var(--color-realm-fan)",
luyenkhi: "var(--color-realm-luyen-khi)",
trucco: "var(--color-realm-truc-co)",
kimdan: "var(--color-realm-kim-dan)",
nguyenanh: "var(--color-realm-nguyen-anh)",
hoathan: "var(--color-realm-hoa-than)",
hopthe: "var(--color-realm-hop-the)",
daithua: "var(--color-realm-dai-thua)",
tien: "var(--color-realm-tien)",
},
element: {
wood: "var(--color-element-wood)",
fire: "var(--color-element-fire)",
earth: "var(--color-element-earth)",
metal: "var(--color-element-metal)",
water: "var(--color-element-water)",
}
},
fontFamily: {
sans: ["var(--font-primary)"],
display: ["var(--font-display)"],
},
animation: {
float: "float 6s ease-in-out infinite",
"pulse-glow": "pulse-glow 3s ease-in-out infinite",
aura: "aura-spin 8s linear infinite",
shimmer: "text-shimmer 3s infinite",
cultivate: "cultivate-rise 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
},
boxShadow: {
'glow-sm': 'var(--shadow-glow-sm)',
'glow-md': 'var(--shadow-glow-md)',
'glow-lg': 'var(--shadow-glow-lg)',
},
backgroundImage: {
'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
'hero-pattern': "url('/assets/bg-stars.svg')",
}
},
},
plugins: [],
};
export default config;