'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const ReactQueryProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
					staleTime: 1000 * 30,
					gcTime: 1000 * 60 * 5,
				},
			},
		}),
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
