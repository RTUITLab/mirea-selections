import VoteButton from '../VoteButton';
import styles from './Applicant.module.scss';
import { isMobile } from 'react-device-detect';

interface ApplicantProps {
	fio: string;
	smallDescription: string;
	avatarSrc: string;
	onClick: () => void;
	onVoteClick: () => void;
	buttonText: string;
}

export function Applicant({
	fio,
	smallDescription,
	avatarSrc,
	onClick,
	onVoteClick,
	buttonText,
}: ApplicantProps) {
	return (
		<div className={styles.applicant} onClick={() => onClick()}>
			<img src={avatarSrc} className={styles.applicantAvatar} />

			<div className={styles.applicantInfo}>
				<div className={styles.applicantInfoText}>
					<p className={styles.applicantFIO}>{fio}</p>
					<p className={styles.applicantSmallDescription}>{smallDescription}</p>
				</div>

				{!isMobile && (
					<VoteButton
						location="applicant"
						onVoteClick={onVoteClick}
						buttonText={buttonText}
					/>
				)}
			</div>
		</div>
	);
}
