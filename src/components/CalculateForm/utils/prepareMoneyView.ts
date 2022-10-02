const moneyPattern = /[\d]{1,3}/g;

const prepareMoneyView = (money: number): string => {
	return (
		money
			.toString()
			.split('')
			.reverse()
			.join('')
			.match(moneyPattern)
			?.reverse()
			.map((number) => number.split('').reverse().join(''))
			.join(' ') || '0'
	);
};

export default prepareMoneyView;
