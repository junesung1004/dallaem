import type { Meta, StoryObj } from '@storybook/react';

import { Selectbox } from './Selectbox';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Selectbox> = {
	component: Selectbox,
	tags: ['autodocs'],
	argTypes: {
		placeholderText: {
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '장소를 선택하세요' },
			},
		},
	},
	args: {
		placeholderText: '장소 선택',
	},
};

export default meta;
type Story = StoryObj<typeof Selectbox>;

export const FirstStory: Story = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
