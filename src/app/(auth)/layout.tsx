import React from 'react';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<main className=''>
			<div className='px-4 md:px-16'>{children}</div>
		</main>
	);
}
