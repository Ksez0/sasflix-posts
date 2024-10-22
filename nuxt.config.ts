// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@pinia/nuxt'],
	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
				},
				{
					rel: 'stylesheet',
					href: 'https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css',
				},
			],
		},
	},
	css: ['~/assets/styles/main.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "~/assets/styles/variables.scss";',
				},
			},
		},
	},
})
