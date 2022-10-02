import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Loading } from '../Loading';

import styles from './Button.module.css';

export interface ButtonProps extends CommonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
	readonly isLoading?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
	const { className, children, isLoading, ...rest } = props;
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{isLoading ? <Loading className={styles.loading} /> : children}
		</button>
	);
};
