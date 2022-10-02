import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './Container.module.css';

export interface ContainerProps extends CommonProps {}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = (props) => {
	const { className, children } = props;
	return <div className={cn(styles.container, className)}>{children}</div>;
};
