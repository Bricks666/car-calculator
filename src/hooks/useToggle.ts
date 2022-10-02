import { useCallback, useState } from 'react';
import { VoidFunction } from '@/interfaces/common';

export interface UseToggleResult {
	readonly value: boolean;
	readonly toggleOn: VoidFunction;
	readonly toggleOff: VoidFunction;
}

const useToggle = (defaultValue = false) => {
	const [value, setValue] = useState(defaultValue);
	const toggleOn = useCallback(() => {
		setValue(true);
	}, []);
	const toggleOff = useCallback(() => {
		setValue(false);
	}, []);
	return {
		value,
		toggleOn,
		toggleOff,
	};
};

export default useToggle;
