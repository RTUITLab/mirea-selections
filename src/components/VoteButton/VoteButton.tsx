import styles from './VoteButton.module.scss';

interface VoteButtonProps {
	location: string;
}

export function VoteButton({ location }: VoteButtonProps) {
	return (
		<button
			className={`${
				location === 'selection'
					? styles.voteButtonSelection
					: location === 'applicant'
					? styles.voteButtonApplicant
					: ''
			} ${styles.voteButton}`}
		>
			Проголосовать
		</button>
	);
}
