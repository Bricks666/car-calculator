import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { AppRoutes } from '@/components/AppRoutes';

export interface AppProps extends CommonProps {}

export const App: React.FC<AppProps> = React.memo(function App() {
	return <AppRoutes />;
});
