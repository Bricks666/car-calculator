import { Prepare } from '@/hooks/useField';
import prepareFieldConstrains from './utils/prepareFieldConstrains';

export const pricePreparers: Prepare<number>[] = [
	prepareFieldConstrains(1_000_000, 6_000_000),
	Number,
];

export const durationPreparers: Prepare<number>[] = [prepareFieldConstrains(1, 60), Number];
