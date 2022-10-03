import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import './styles/index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<BrowserRouter basename={process.env.VERCEL_URL}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);