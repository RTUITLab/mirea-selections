import styles from './App.module.scss';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import mireaLogosBackgroundSrc from '../../assets/mirea_logos_background.svg';
import { useState } from 'react';
import Banner from '../Banner';
import SelectionInfo from '../SelectionInfo';

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
		if (window.scrollY < 100) {
			setMireaLogosHidden(false);
		} else {
			setMireaLogosHidden(true);
		}
	});

	window.addEventListener('resize', () => {
		setCurrentWidth(window.innerWidth);
	});
	return (
		<>
			<section className={styles.main}>
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
			</section>

			<SelectionInfo />
		</>
	);
}
