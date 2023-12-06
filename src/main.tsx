import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Selection from './components/Selection';
import MobileSelection from './components/MobileSelection';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: 'selection',
		element: <Selection />,
	},
	{
		path: 'mob-selection',
		element: <MobileSelection />,
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
