import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Container } from '@/components/Container';

import styles from './MainLayout.module.css';

export interface MainLayoutProps extends CommonProps {}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (props) => {
	const { className, children } = props;
	return <Container className={cn(styles.mainLayout, className)}>{children}</Container>;
};
