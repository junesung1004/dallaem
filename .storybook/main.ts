import { StorybookConfig } from 'storybook/internal/types';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/experimental-addon-test',
		'@storybook/addon-styling-webpack',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	staticDirs: ['..\\public'],
};
export default config;
