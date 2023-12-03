import styles from './App.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import mireaLogosBackgroundSrc from '../../assets/mirea_logos_background.svg';
import { useState } from 'react';
import Banner from '../Banner';

const queryClient = new QueryClient();

export default function App() {
	const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

	window.addEventListener('resize', () => {
		setCurrentWidth(window.innerWidth);
	});
	return (
		<QueryClientProvider client={queryClient}>
			<main className={styles.main}>
				<img src={leavesBackgroundSrc} className={styles.leavesBackground} />

				<img
					src={awardCupBackgroundSrc}
					className={styles.awardCupBackground}
				/>
				<img
					src={mireaLogosBackgroundSrc}
					className={styles.mireaLogosBackground}
				/>

				<Banner currentWidth={currentWidth} />
			</main>
		</QueryClientProvider>
	);
}
