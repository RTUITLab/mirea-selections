import styles from './Applicant.module.scss';

interface ApplicantProps {
	fio: string;
	smallDescription: string;
	avatarSrc: string;
	grayscale: boolean;
	onClick: () => void;
}

export function Applicant({
	fio,
	smallDescription,
	avatarSrc,
	grayscale,
	onClick,
}: ApplicantProps) {
	return (
		<div className={`${styles.applicant} ${grayscale ? styles.grayscale : ''}`} onClick={() => onClick()}>
			<img src={avatarSrc} className={styles.applicantAvatar} />

			<div className={styles.applicantInfo}>
				<div className={styles.applicantInfoText}>
					<p className={styles.applicantFIO}>{fio}</p>
					<p className={styles.applicantSmallDescription}>{smallDescription}</p>
				</div>
			</div>
		</div>
	);
}
