import styles from './App.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import mireaLogosBackgroundSrc from '../../assets/mirea_logos_background.svg';
import { useState } from 'react';
import Banner from '../Banner';
import SelectionInfo from '../SelectionInfo';

const queryClient = new QueryClient();

export default function App() {
	const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
	const [mireaLogosHidden, setMireaLogosHidden] = useState(false);
	// const body = document.body;

	// useEffect(() => {
	// 	if (currentWidth > 1024) {
	// 		body.classList.add('disableScroll');
	// 	} else {
	// 		body.classList.remove('disableScroll');
	// 	}
	// }, [currentWidth]);

	window.addEventListener('scroll', () => {
		if (window.scrollY === 0) {
			setMireaLogosHidden(false);
		}
	});

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
					className={`${styles.mireaLogosBackground} ${
						mireaLogosHidden && styles.mireaLogosBackgroundHidden
					}`}
				/>

				<Banner
					currentWidth={currentWidth}
					setMireaLogosHidden={setMireaLogosHidden}
				/>
			</main>

			<SelectionInfo />
		</QueryClientProvider>
	);
}
