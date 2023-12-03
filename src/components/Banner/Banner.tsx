import styles from './Banner.module.scss';

import awardCup from '../../assets/awardCup.svg';
import bannerTextDesktopSrc from '../../assets/banner_text_desktop.svg';
import bannerTextMobileSrc from '../../assets/banner_text_mobile.svg';
import arrowDownSrc from '../../assets/arrow_down.svg';

interface BannerProps {
	currentWidth: number;
}

export function Banner({ currentWidth }: BannerProps) {
	return (
		<>
			<div className={styles.mainContent}>
				<img src={awardCup} className={styles.bannerAwardCup} />
				{currentWidth > 1024 ? (
					<img src={bannerTextDesktopSrc} className={styles.bannerText} />
				) : (
					<img src={bannerTextMobileSrc} className={styles.bannerTextMobile} />
				)}

				{currentWidth <= 1024 && (
					<img src={arrowDownSrc} className={styles.downButtonIconMobile} />
				)}
			</div>

			{currentWidth > 1024 && (
				<button className={styles.downButton}>
					<p className={styles.downButtonText}>
						Нажмите, чтобы продолжить просмотр
					</p>
					<img src={arrowDownSrc} className={styles.downButtonIcon} />
				</button>
			)}
		</>
	);
}
