import * as React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';

import styles from './MainPage.module.css';

const MainPage: React.FC = () => {
	return (
		<MainLayout className={styles.main}>
			<Field max={15} min={10} value={15} label='test' />
			<Button>sdd</Button>
			<Button isLoading>sdd</Button>
		</MainLayout>
	);
};

export default MainPage;
