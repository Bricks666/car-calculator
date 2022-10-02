import {
	ChangeEventHandler,
	FocusEventHandler,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { VoidFunction } from '@/interfaces/common';
import useEvent from './useEvent';

export type AllowedFieldTypes = number | string | boolean;

export type Prepare<T extends AllowedFieldTypes> = (value: T | null, lastValidValue: T) => T | null;

export interface UseFieldParams<T extends AllowedFieldTypes> {
	readonly defaultValue: T;
	readonly prepareValue?: Prepare<T> | Prepare<T>[];
}

export interface UseFieldResult<T extends AllowedFieldTypes> {
	readonly value: T;
	readonly onChange: ChangeEventHandler<HTMLInputElement>;
	readonly onBlur: FocusEventHandler<HTMLInputElement>;
	readonly reset: VoidFunction;
	readonly isDirty: boolean;
}

const useField = <T extends AllowedFieldTypes>(params: UseFieldParams<T>): UseFieldResult<T> => {
	const { defaultValue, prepareValue } = params;
	const [value, setValue] = useState<T>(defaultValue);
	const lastValidValueRef = useRef(value);

	const onChange = useEvent<ChangeEventHandler<HTMLInputElement>>((evt) => {
		setValue(evt.target.value as T);
	});

	const validate = useEvent(() => {
		const lastValidValue: T = lastValidValueRef.current;
		let preparedValue: T | null = null;
		if (prepareValue) {
			if (Array.isArray(prepareValue)) {
				preparedValue = prepareValue.reduceRight<T | null>(
					(acc, preparer) => preparer(acc, lastValidValue),
					value
				);
			} else {
				preparedValue = prepareValue(value, lastValidValue);
			}
		}
		if (Number.isNaN(preparedValue) || preparedValue === null) {
			return;
		}

		lastValidValueRef.current = preparedValue;
		setValue(preparedValue);
	});

	const onBlur = useEvent<FocusEventHandler<HTMLInputElement>>(() => {
		validate();
	});

	useLayoutEffect(() => {
		validate();
	}, [prepareValue]);

	const reset = useCallback(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return {
		value,
		onChange,
		onBlur,
		reset,
		isDirty: value !== defaultValue,
	};
};

export default useField;
