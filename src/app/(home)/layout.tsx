import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
	children: React.ReactNode;
	createmodal: React.ReactNode;
};

export default function Layout({ children, createmodal }: Props) {
	return (
		<main className='px-4 md:px-6 lg:px-[106px] bg-gray-50 mx-auto max-w-[1200px] py-10'>
			{createmodal}
			<div className='md:max-w-[996px] mx-auto'>{children}</div>
			<ToastContainer />
		</main>
	);
}
