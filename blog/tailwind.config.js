const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').config} */
export default {
    content: [
        "./index/html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {}
    },
    plugins: [flowbite.plugin(),]
        

    
}