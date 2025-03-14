import type { Meta, StoryObj } from '@storybook/react';

import { StatusBadge } from './StatusBadge';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof StatusBadge> = {
	component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
