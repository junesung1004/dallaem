import type { Meta, StoryObj } from '@storybook/react';

import { HideToggleButton } from './HideToggleButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HideToggleButton> = {
	component: HideToggleButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HideToggleButton>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
