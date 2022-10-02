import * as React from 'react';

interface Route {
	readonly path: string;
	readonly Component: React.ComponentType;
}

const NotFoundPage = React.lazy(() => import('../pages/NotFound'));
const MainPage = React.lazy(() => import('../pages/Main'));

export const routes: Route[] = [
	{
		path: '/',
		Component: MainPage,
	},
	{
		path: '*',
		Component: NotFoundPage,
	},
];
