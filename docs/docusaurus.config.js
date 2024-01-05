// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	markdown: {
		mermaid: true,
	},
	title: 'Stromae V3',
	tagline: `Orchestrateur web de la filière d'enquête de l'Insee`,
	favicon: '/img/favicon.ico',

	// Set the production url of your site here
	url: 'https://inseefr.github.io/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: 'Stromae',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'InseeFr', // Usually your GitHub org/user name.
	projectName: 'stromae', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: './sidebars.js',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/InseeFr/Stromae/tree/v3-master/docs',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: '/img/docusaurus-social-card.jpg',
			navbar: {
				title: 'Stromae',
				logo: {
					alt: 'Stromae',
					src: '/img/logo.svg',
				},
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'tutorialSidebar',
						position: 'left',
						label: 'Documentation',
					},
					{
						href: 'https://github.com/InseeFr/Stromae',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Documentation',
								to: '/',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Github',
								href: 'https://github.com/InseeFr/Stromae',
							},
							{
								label: 'Issues',
								href: 'https://github.com/InseeFr/Stromae/issues',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} InseeFr. Built with Docusaurus.`,
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
			},
		}),
};

export default config;
