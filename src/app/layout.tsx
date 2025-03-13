import type { Metadata } from 'next';

import './globals.css';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import Header from '@/components/GNB/Header';
import { ModalProvider } from '@/lib/ModalProvider';

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
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<meta name='theme-color' content='#ffffff' />
				<meta name='description' content='앱 설명을 여기에 입력하세요.' />
			</head>
			<body className='font-sans antialiased'>
				<ReactQueryProvider>
					<Header />
					<ModalProvider>{children}</ModalProvider>
				</ReactQueryProvider>
				<div id='modal-root'></div>
			</body>
		</html>
	);
}
