import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { InputWindow } from './InputWindow';
import { fn } from '@storybook/test';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof InputWindow> = {
	component: InputWindow,
	args: {
		placeholderText: 'Enter text...',
		value: '',
		isError: false,
		type: 'text',
		id: 'input-window',
		className: 'custom-class',
		onChange: fn(),
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputWindow>;

export const Default: Story = {};
