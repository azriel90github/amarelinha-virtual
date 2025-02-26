/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				colorFundo: "#E6B31B",//
				colorText1: "#806613",//
				colorButton: "#5E4C11",//
				colorHover: "#A08016",//
				buttonColor: "#5E4C11",//
				buttonColor3: "#5c1e4d",
				buttonColor2: "#806613",
				headerColor: "#A08016",//
				headerColor2: "#99658f91",
				searchColor: "#C49A18",
				searchColorInput: "#C49A18",
				moneyColor: "green",
				moneyColor1: "#22c55e",
				colorRemove: "red",
				colorRemove1: "#dc2626",
				colorStar: "#d946ef",
				colorInput: "#F7931B",//
				colorExtra: "#955573",
				jsColor: "#FFDF00",
				goColor: "#007D9C",
				whatsappColor: "#25D366",
			},

			fontFamily: {
				sans: "Inter",
			},
			boxShadow: {
				shape:
					"0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 8px 0px 4px 4px rgba(153, 101, 143, 0.1), 0px 2px 2px rgba(153, 101, 143, 0.1), 0px 0px 0px 1px rgba(153, 101, 143, 0.1), inset 0px 0px 0px 1px rgba(153, 101, 143, 0.03), inset 0px 1px 0px rgba(153, 101, 143, 0.03)",
			},

			backgroundImage: {
				fundoHome: "url('/.png')",
				fundoBg: "url('/bg.png')"
			},

			screens: {
				'sm': '640px',    // Tela pequena
				'md': '768px',    // Tela média
				'lg': '1024px',   // Tela grande
				'xl': '1280px',   // Tela extra grande
				'2xl': '1536px',  // Tela 2xl
	
				// Personalizando suas próprias telas
				'3xl': '1920px',  // Tela 3xl personalizada
				'4k': '3840px',   // Adicionando um breakpoint para 4K
			},
			extend: {},
		},
	},
	plugins: [],
};

