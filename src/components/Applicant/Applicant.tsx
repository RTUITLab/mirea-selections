import styles from './Applicant.module.scss';

interface ApplicantProps {
	fio: string;
	smallDescription: string;
	avatarSrc: string;
}

export function Applicant({
	fio,
	smallDescription,
	avatarSrc,
}: ApplicantProps) {
	return (
		<div className={styles.applicant}>
			<img src={avatarSrc} className={styles.applicantAvatar} />

			<div className={styles.applicantInfo}>
				<p className={styles.applicantFIO}>{fio}</p>
				<p className={styles.applicantSmallDescription}>{smallDescription}</p>
			</div>
		</div>
	);
}
