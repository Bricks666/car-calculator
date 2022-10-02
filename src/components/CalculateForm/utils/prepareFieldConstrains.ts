import { Prepare } from '@/hooks/useField';

const prepareFieldConstrains = (min: number, max: number): Prepare<number> => {
	return (value, lastValidValue) => {
		return Math.max(min, Math.min(value || lastValidValue, max));
	};
};

export default prepareFieldConstrains;
