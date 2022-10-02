export interface AddRequestParams {
	readonly price: number;
	readonly initialPayPercent: number;
	readonly duration: number;
}

export const addRequest = async (params: AddRequestParams): Promise<unknown> => {
	const result = await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
		body: JSON.stringify(params),
		method: 'POST',
	});

	return result.json();
};
