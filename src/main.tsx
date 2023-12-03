import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Selection from './components/Selection';
import './index.scss';

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
