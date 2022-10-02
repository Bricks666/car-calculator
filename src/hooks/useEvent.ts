import { useCallback, useRef } from 'react';
import { AnyFunction } from '@/interfaces/common';

const useEvent = <F extends AnyFunction>(foo: F) => {
	const fooRef = useRef(foo);

	fooRef.current = foo;

	return useCallback((...args: Parameters<F>): ReturnType<F> => {
		const { current } = fooRef;

		return current(...args);
	}, []);
};

export default useEvent;
