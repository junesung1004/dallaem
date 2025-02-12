import React from 'react';

type Props = {
	children: React.ReactNode;
	createmodal: React.ReactNode;
};

export default function Layout({ children, createmodal }: Props) {
	return (
		<main className='w-full relative lg:w-[996px] xl:w-[1198px] min-h-screen mx-auto bg-white'>
			{createmodal}
			{children}
		</main>
	);
}
