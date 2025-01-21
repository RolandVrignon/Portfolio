import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
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
		fontSize: {
			'10xl': '8rem', // Exemple : Taille de 8rem
			'11xl': '10rem', // Exemple : Taille de 10rem
			'12xl': '12rem', // Exemple : Taille de 12rem
			'13xl': '14rem', // Exemple : Taille de 14rem
			'14xl': '16rem', // 16rem = 256px
			'15xl': '20rem', // 20rem = 320px
			'16xl': '25rem', // 25rem = 400px
			'17xl': '30rem', // 30rem = 480px
			'18xl': '35rem', // 35rem = 560px
			'19xl': '40rem', // 40rem = 640px
			'20xl': '50rem', // 50rem = 800px
		},
		lineHeight: {
			'10xl': '9.6rem',  // 8rem * 1.2
			'11xl': '12rem',   // 10rem * 1.2
			'12xl': '14.4rem', // 12rem * 1.2
			'13xl': '16.8rem', // 14rem * 1.2
			'14xl': '14rem', // 16rem * 1.2
			'15xl': '17rem',   // 20rem * 1.2
			'16xl': '30rem',   // 25rem * 1.2
			'17xl': '36rem',   // 30rem * 1.2
			'18xl': '42rem',   // 35rem * 1.2
			'19xl': '48rem',   // 40rem * 1.2
			'20xl': '60rem',   // 50rem * 1.2
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
