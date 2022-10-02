import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './Loading.module.css';

export interface LoadingProps extends CommonProps {}

export const Loading: React.FC<LoadingProps> = React.memo(function Loading(props) {
	const { className } = props;
	return <div className={cn(styles.loading, className)} />;
});
