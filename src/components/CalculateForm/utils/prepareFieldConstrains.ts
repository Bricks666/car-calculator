import { Prepare } from '@/hooks/useField';

const prepareFieldConstrains = (min: number, max: number): Prepare<number> => {
	return (value) => {
		return Math.max(min, Math.min(value, max));
	};
};

export default prepareFieldConstrains;
