import type { Metadata } from 'next';

import './globals.css';
import { ReactQueryProvider } from './lib/ReactQueryProvider';
import Header from './components/Header';

export const metadata: Metadata = {
	title: '같이달램',
	description: '오프라인 모임을 주최하는 플랫폼',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body className='font-sans antialiased'>
				<ReactQueryProvider>
					<Header />
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	);
}
