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
                accent: '#1FDB84', // Accent

                // Custom Colors
                transparent: 'transparent', // Transparent
                'radial-gradient-1': '#4B567C', // Radial Gradient 1
                'radial-gradient-2': '#242C4D', // Radial Gradient 2
                'white-green-bg': '#F7FDF8', // White Green Background
                placeholder: '#4A4FC9', // Placeholder
                'radial-grad-2': '#242C46', // Radial Grad 2
                'dark-blue': '#031D5B', // Dark Blue
                'footer-bg': '#EFFCF6', // Footer Background
                'white-10': '#FFFFFF1A', // White 10%
                'very-dark-blue': '#313A5A', // Very Dark Desaturated Blue (совпадает с Secondary)
                'very-light-gray': '#DDDDDD', // Very Light Gray
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
