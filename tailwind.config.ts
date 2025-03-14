import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#FFE8EB',
					100: '#FFC3C9',
					200: '#FF9BA3',
					300: '#FF7983',
					400: '#FF5F6D',
					500: '#FF4A5A',
					600: '#FF5160 ',
					700: '#E44856',
					800: '#C93E4A',
					900: '#A5323D',
					950: '#7F252E',
				},
				secondary: {
					600: '#9747FF',
					700: '#6D15C5',
				},
			},
			screens: {
				sm: '375px',
				md: '744px',
				lg: '1920px',
			},
			fontFamily: {
				sans: ['Pretendard', 'sans-serif'],
			},
			fontSize: {
				/** 명시적으로 작성 */
				xs: ['12px', '16px'],
				sm: ['14px', '20px'],
				base: ['16px', '24px'],
				lg: ['18px', '28px'],
				xl: ['20px', '28px'],
				'2xl': ['24px', '32px'],
				'3xl': ['30px', '36px'],
			},
			keyframes: {
				scale: {
					from: { transform: 'scale(0)' },
					to: { transform: 'scale(1)' },
				},
			},
			animation: {
				scaleUp: 'scale 0.3s ease-in-out',
			},
		},
	},
} satisfies Config;
