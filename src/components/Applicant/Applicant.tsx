import styles from './Applicant.module.scss';

interface ApplicantProps {
	fio: string;
	smallDescription: string;
	avatarSrc: string;
	onClick: () => void;
}

export function Applicant({
	fio,
	smallDescription,
	avatarSrc,
	onClick,
}: ApplicantProps) {
	return (
		<div className={styles.applicant} onClick={() => onClick()}>
			<img src={avatarSrc} className={styles.applicantAvatar} />

			<div className={styles.applicantInfo}>
				<p className={styles.applicantFIO}>{fio}</p>
				<p className={styles.applicantSmallDescription}>{smallDescription}</p>
			</div>
		</div>
	);
}
