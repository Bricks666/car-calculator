import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Input } from '../Input';
import { Range } from '../Range';

import styles from './InputWithRange.module.css';

export interface InputWithRangeProps
	extends CommonProps,
		React.InputHTMLAttributes<HTMLInputElement> {
	readonly postfix?: string;
}

export const InputWithRange: React.FC<InputWithRangeProps> = React.memo(function InputWithRange(
	props
) {
	const { className, type, ...rest } = props;
	return (
		<div className={cn(styles.inputWithRange, className)}>
			<Input className={styles.input} {...rest} type={type} />
			<Range className={styles.range} {...rest} />
		</div>
	);
});
