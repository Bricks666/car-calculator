import { Prepare } from '@/hooks/useField';
import prepareFieldConstrains from './utils/prepareFieldConstrains';

export const pricePreparers: Prepare<number>[] = [
	prepareFieldConstrains(1_000_000, 6_000_000),
	parseInt as unknown as Prepare<number>,
];

export const durationPreparers: Prepare<number>[] = [
	prepareFieldConstrains(1, 60),
	parseInt as unknown as Prepare<number>,
];
