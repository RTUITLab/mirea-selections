import styles from './VoteButton.module.scss';

interface VoteButtonProps {
	location: string;
	onVoteClick: () => void;
	buttonText: string;
}

export function VoteButton({
	location,
	onVoteClick,
	buttonText,
}: VoteButtonProps) {
	return (
		<button
			className={`${
				location === 'selection'
					? styles.voteButtonSelection
					: location === 'applicant'
					? styles.voteButtonApplicant
					: location === 'mobileSelection'
					? styles.voteButtonMobile
					: ''
			} ${styles.voteButton}`}
			onClick={() => onVoteClick()}
			disabled={buttonText === 'Вы проголосовали!'}
		>
			{buttonText}
		</button>
	);
}
