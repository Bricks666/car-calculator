import * as React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { CalculateForm } from '@/components/CalculateForm';

import styles from './MainPage.module.css';

const MainPage: React.FC = () => {
	return (
		<MainLayout className={styles.main}>
			<h1 className={styles.header}>Рассчитайте стоимость автомобиля в лизинг</h1>
			<CalculateForm />
		</MainLayout>
	);
};

export default MainPage;
