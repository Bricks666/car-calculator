import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './Range.module.css';

export interface RangeProps
	extends CommonProps,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Range: React.FC<RangeProps> = React.memo(function Range(props) {
	const { className, ...rest } = props;
	return <input className={cn(styles.range, className)} type='range' {...rest} />;
});
