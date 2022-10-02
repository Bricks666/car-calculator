/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './Label.module.css';

export interface LabelProps extends CommonProps, React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = (props) => {
	const { className, children, ...rest } = props;
	return (
		<label className={cn(styles.label, className)} {...rest}>
			{children}
		</label>
	);
};
