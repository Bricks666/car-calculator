import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './Input.module.css';

export interface InputProps extends CommonProps, React.InputHTMLAttributes<HTMLInputElement> {
	readonly type?: Exclude<React.InputHTMLAttributes<HTMLInputElement>['type'], 'range'>;
	readonly postfix?: string;
}

export const Input: React.FC<InputProps> = React.memo(function Input(props) {
	const { className, postfix, ...rest } = props;
	return (
		<div className={cn(styles.container, className)}>
			<input
				className={cn(styles.input, {
					[styles.inputHasPostfix]: postfix,
				})}
				{...rest}
			/>
			{!!postfix && <span className={styles.postfix}>{postfix}</span>}
		</div>
	);
});
