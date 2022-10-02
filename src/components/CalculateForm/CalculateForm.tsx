import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Field } from '../Field';
import { Label } from '../Label';
import { Button } from '../Button';
import useField from '@/hooks/useField';
import useEvent from '@/hooks/useEvent';
import prepareMoneyView from './utils/prepareMoneyView';
import useToggle from '@/hooks/useToggle';
import { durationPreparers, pricePreparers } from './validating';
import prepareFieldConstrains from './utils/prepareFieldConstrains';
import { createCalculateRequest, CreateCalculateRequestParams } from '@/api/calculate';

import styles from './CalculateForm.module.css';

export interface CalculateFormProps extends CommonProps {}

export const CalculateForm: React.FC<CalculateFormProps> = React.memo(function CalculateForm(
	props
) {
	const { className } = props;
	const price = useField({ defaultValue: 1_000_000, prepareValue: pricePreparers });
	const minInitialPay = price.value / 10;
	const maxInitialPay = (price.value / 10) * 6;
	const initialPayPreparers = React.useMemo(
		() => [prepareFieldConstrains(minInitialPay, maxInitialPay), Number],
		[minInitialPay, maxInitialPay]
	);
	const initialPay = useField({ defaultValue: 10_000 * 13, prepareValue: initialPayPreparers });
	const duration = useField({ defaultValue: 10, prepareValue: durationPreparers });
	const isLoading = useToggle(false);

	const onSubmit = useEvent<React.FormEventHandler<HTMLFormElement>>(async (evt) => {
		evt.preventDefault();
		isLoading.toggleOn();
		try {
			const data: CreateCalculateRequestParams = {
				duration: duration.value,
				initialPayPercent: (initialPay.value / price.value) * 100,
				price: price.value,
			};
			await createCalculateRequest(data);
		} catch (error) {
			alert('Произошла ошибка');
		} finally {
			isLoading.toggleOff();
			price.reset();
			initialPay.reset();
			duration.reset();
		}
	});

	const initialPayPercent = Math.ceil((initialPay.value / price.value) * 100);
	const monthPay = Math.ceil(
		(price.value - initialPay.value) *
			((0.035 * (1 + 0.035) ** duration.value) / ((1 + 0.035) ** duration.value - 1))
	);

	const dealAmount = +initialPay.value + +duration.value * monthPay;

	return (
		<form className={cn(styles.calculateForm, className)} onSubmit={onSubmit}>
			<Field
				className={styles.field}
				value={price.value}
				onChange={price.onChange}
				onBlur={price.onBlur}
				min={1_000_000}
				max={6_000_000}
				step={10_000}
				postfix='₽'
				label='Стоимость автомобиля'
			/>
			<Field
				className={styles.field}
				value={initialPay.value}
				onChange={initialPay.onChange}
				onBlur={initialPay.onBlur}
				min={minInitialPay}
				max={maxInitialPay}
				step={1000}
				postfix={`${initialPayPercent}%`}
				label='Первоначальный взнос'
			/>
			<Field
				className={styles.field}
				value={duration.value}
				onChange={duration.onChange}
				onBlur={duration.onBlur}
				min={1}
				max={60}
				postfix='мес.'
				label='Срок лизинга'
			/>
			<p className={styles.result}>
				<Label>Сумма договора лизинга</Label>
				<span className={styles.resultText}>{prepareMoneyView(dealAmount)} ₽</span>
			</p>
			<p className={styles.result}>
				<Label>Ежемесячный платеж от</Label>
				<span className={styles.resultText}>{prepareMoneyView(monthPay)} ₽</span>
			</p>
			<Button className={styles.button} type='submit' isLoading={isLoading.value}>
				Оставить заявку
			</Button>
		</form>
	);
});
