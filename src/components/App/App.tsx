import styles from './App.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import mireaLogosBackgroundSrc from '../../assets/mirea_logos_background.svg';
import awardCup from '../../assets/awardCup.svg';
import bannerTextDesktopSrc from '../../assets/banner_text_desktop.svg';
import arrowDownSrc from '../../assets/arrow_down.svg';

const queryClient = new QueryClient();

export default function App() {
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
				<div className={styles.mainContent}>
					<img src={awardCup} className={styles.bannerAwardCup} />
					<img src={bannerTextDesktopSrc} className={styles.bannerText} />
				</div>

				<button className={styles.downButton}>
					<p className={styles.downButtonText}>
						Нажмите, чтобы продолжить просмотр
					</p>
					<img src={arrowDownSrc} className={styles.downButtonIcon} />
				</button>
			</main>
		</QueryClientProvider>
	);
}
