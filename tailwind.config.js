/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                // System Colors
                primary: '#FFFFFF', // Primary
                secondary: '#313A5A', // Secondary
                text: '#313A5A', // Text
                accent: '#1EDB84', // Accent

                // Custom Colors
                transparent: 'transparent', // Transparent
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            screens: {
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
    },
    plugins: [],
}
