import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from './ProgressBar';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ProgressBar> = {
	component: ProgressBar,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
