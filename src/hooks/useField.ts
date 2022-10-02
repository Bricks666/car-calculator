import { ChangeEvent, ChangeEventHandler, useCallback, useLayoutEffect, useState } from 'react';
import { VoidFunction } from '@/interfaces/common';
import useEvent from './useEvent';

export type AllowedFieldTypes = number | string | boolean;

export type Prepare<T extends AllowedFieldTypes> = (value: T) => T;

export interface UseFieldParams<T extends AllowedFieldTypes> {
	readonly defaultValue: T;
	readonly prepareValue?: Prepare<T> | Prepare<T>[];
}

export interface UseFieldResult<T extends AllowedFieldTypes> {
	readonly value: T;
	readonly onChange: ChangeEventHandler<HTMLInputElement>;
	readonly reset: VoidFunction;
	readonly isDirty: boolean;
}

const useField = <T extends AllowedFieldTypes>(params: UseFieldParams<T>): UseFieldResult<T> => {
	const { defaultValue, prepareValue } = params;
	const [value, setValue] = useState<T>(defaultValue);

	const onChange = useEvent<ChangeEventHandler<HTMLInputElement>>((evt) => {
		let preparedValue: T = evt.target.value as T;
		if (prepareValue) {
			if (Array.isArray(prepareValue)) {
				preparedValue = prepareValue.reduceRight((acc, preparer) => preparer(acc), preparedValue);
			} else {
				preparedValue = prepareValue(preparedValue);
			}
		}

		if (
			Number.isNaN(preparedValue) ||
			typeof preparedValue === 'undefined' ||
			preparedValue === null
		) {
			return;
		}
		setValue(preparedValue);
	});

	useLayoutEffect(() => {
		onChange({
			target: {
				value,
			},
		} as unknown as ChangeEvent<HTMLInputElement>);
	}, [prepareValue]);

	const reset = useCallback(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return {
		value,
		onChange,
		reset,
		isDirty: value !== defaultValue,
	};
};

export default useField;
