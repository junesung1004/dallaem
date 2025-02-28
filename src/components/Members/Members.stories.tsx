import type { Meta, StoryObj } from '@storybook/react';

import Members from './Members';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Members> = {
	component: Members,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Members>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
