import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { InputWithRange, InputWithRangeProps } from '../InputWithRange';

import styles from './Field.module.css';
import { Label } from '../Label';

export interface FieldProps extends CommonProps, InputWithRangeProps {
	readonly label?: string;
}

export const Field: React.FC<FieldProps> = React.memo(function Field(props) {
	const { className, label, ...rest } = props;
	const inputId = React.useId();
	return (
		<div className={cn(styles.field, className)}>
			{label && <Label htmlFor={inputId}>{label}</Label>}
			<InputWithRange id={inputId} {...rest} />
		</div>
	);
});
