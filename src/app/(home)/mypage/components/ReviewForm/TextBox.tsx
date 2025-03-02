import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

interface TextBoxProps
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	typhograpy?: string;
	content: string;
}

function TextBox(props: TextBoxProps) {
	return (
		<textarea
			className={`bg-transparent resize-none w-full h-full outline-none ${props?.typhograpy} h-[100px] hide-scroll`}
			{...(props as TextBoxProps)}
			value={props.content}
			onChange={props.onChange}
		/>
	);
}

export default TextBox;
