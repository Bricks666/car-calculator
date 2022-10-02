import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<div>HEllo</div>
		</BrowserRouter>
	</React.StrictMode>
);
