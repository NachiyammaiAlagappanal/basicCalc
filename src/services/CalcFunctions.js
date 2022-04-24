import operators from './operators.js';

const ten = 10;
const hundred = 100;

const specialNumbers = {
	'%': (context) => context.state.number / hundred,
	'00': (context) => context.state.number * hundred,
};

const addDigit = (context) => (context.state.number * ten) + context.data.value;

const CalcFunctions = {

	getNumber: (context) =>
		(specialNumbers[context.data.value] || addDigit)(context),

	calculation: (context) => {
		const { state: { operator }} = context;

		return operators[operator]
			? operators[operator]({ ...context,
				data: CalcFunctions.getNumber(context) })
			: CalcFunctions.getNumber(context);
	},

	updateResult: (context) => {
		const { state: { result }, data } = context;

		return data === 'clear' ? 0 : result;
	},
};

export default CalcFunctions;
