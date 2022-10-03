import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '@/routes';

export interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = React.memo(function AppRoutes() {
	return (
		<Routes>
			{routes.map(({ path, Component }) => (
				<Route path={path} element={<Component />} key={path} />
			))}
		</Routes>
	);
});
