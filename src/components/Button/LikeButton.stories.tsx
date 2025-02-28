import type { Meta, StoryObj } from '@storybook/react';

import { LikeButton } from './LikeButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LikeButton> = {
	component: LikeButton,
	tags: ['autodocs'],
	// argTypes: {
	// 	text: {
	// 		control: 'date',
	// 		table: {
	// 			type: { summary: 'date' },
	// 			defaultValue: { summary: '2025-02-28T02:42:43.734Z' },
	// 		},
	// 	},
	// },
	// args: {
	// 	type: 'date',
	// },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
