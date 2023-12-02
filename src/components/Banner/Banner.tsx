import styles from './Banner.module.scss';

import awardCup from '../../assets/awardCup.svg';
import bannerTextDesktopSrc from '../../assets/banner_text_desktop.svg';

export function Banner() {
	return (
		<section className={styles.banner}>
			<div className={styles.bannerMainContent}>
				<img src={awardCup} className={styles.bannerAwardCup} />
				<img src={bannerTextDesktopSrc} className={styles.bannerText} />
			</div>
			<button className={styles.bannerDownButton}></button>
		</section>
	);
}
