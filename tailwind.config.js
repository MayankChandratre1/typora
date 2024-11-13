/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		  typography: (theme) => ({
			DEFAULT: {
			  css: {
				color: theme('colors.gray.800'), // Normal text color for light mode
			  },
			},
			dark: {
			  css: {
				color: theme('colors.gray.100'), // Lighten text color for dark mode
				'[class~="lead"]': { color: theme('colors.gray.200') },
				a: { color: theme('colors.blue.400') },
				strong: { color: theme('colors.gray.100') },
				'ol > li::before': { color: theme('colors.gray.400') },
				'ul > li::before': { backgroundColor: theme('colors.gray.600') },
				hr: { borderColor: theme('colors.gray.700') },
				blockquote: {
				  color: theme('colors.gray.100'),
				  borderLeftColor: theme('colors.gray.700'),
				},
				h1: { color: theme('colors.gray.100') },
				h2: { color: theme('colors.gray.100') },
				h3: { color: theme('colors.gray.100') },
				h4: { color: theme('colors.gray.100') },
				code: { color: theme('colors.gray.100'), backgroundColor: theme('colors.gray.800') },
				h5: { color: theme('colors.gray.100') },
				h6: { color: theme('colors.gray.100') },
			  },
			},
		  }),
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}