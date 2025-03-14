import type { Meta, StoryObj } from '@storybook/react';

import PageInfo from './PageInfo';
//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof PageInfo> = {
	component: PageInfo,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageInfo>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
