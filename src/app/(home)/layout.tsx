import React from 'react';

type Props = {
	children: React.ReactNode;
	createmodal: React.ReactNode;
	review: React.ReactNode;
};

export default function Layout({ children, createmodal, review }: Props) {
	return (
		<main className='w-full relative lg:w-[996px] xl:w-[1198px] min-h-screen mx-auto bg-white'>
			{createmodal}
			{children}
			{review}
		</main>
	);
}
