import styles from './Banner.module.scss';

import awardCup from '../../assets/star2.svg';
import bannerTextDesktopSrc from '../../assets/banner_text_desktop.svg';
import bannerTextMobileSrc from '../../assets/banner_text_mobile.svg';
import arrowDownSrc from '../../assets/arrow_down.svg';
import { Dispatch, SetStateAction } from 'react';

interface BannerProps {
	currentWidth: number;
	setMireaLogosHidden: Dispatch<SetStateAction<boolean>>;
}

export function Banner({ currentWidth, setMireaLogosHidden }: BannerProps) {
	function handleClickScroll() {
		const nextSection = document.getElementById('selectionInfo');
		setMireaLogosHidden(true);
		nextSection?.scrollIntoView({ behavior: 'smooth' });
	}
	return (
		<>
			<div className={styles.mainContent}>
				{currentWidth > 1024 ? (
					<>
						<img src={awardCup} className={styles.bannerAwardCup} />
						<img src={bannerTextDesktopSrc} className={styles.bannerText} />
					</>
				) : (
					<div className={styles.mainContentBannerContainer}>
						<img src={awardCup} className={styles.bannerAwardCup} />
						<img
							src={bannerTextMobileSrc}
							className={styles.bannerTextMobile}
						/>
					</div>
				)}

				{currentWidth <= 1024 && (
					<img src={arrowDownSrc} className={styles.downButtonIconMobile} />
				)}
			</div>

			{currentWidth > 1024 && (
				<button className={styles.downButton} onClick={handleClickScroll}>
					<p className={styles.downButtonText}>
						Нажмите, чтобы продолжить просмотр
					</p>
					<img src={arrowDownSrc} className={styles.downButtonIcon} />
				</button>
			)}
		</>
	);
}
