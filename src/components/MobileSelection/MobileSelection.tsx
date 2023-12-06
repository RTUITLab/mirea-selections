/* eslint-disable no-mixed-spaces-and-tabs */
import styles from './MobileSelection.module.scss';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import selectionTitleSrc from '../../assets/selection_title.svg';
import { useState } from 'react';
import Applicant from '../Applicant';
import { useQuery } from '@tanstack/react-query';
import { getNominationInfo, getVotingInfo } from '../../api';

type NominationType = 'teachers' | 'students';

interface ApplicantInfo {
	id: string;
	slug: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	video_url: string;
}

export function MobileSelection() {
	const [chosenNomination, setChosenNomination] =
		useState<NominationType>('teachers');
	const [teacherNominationId, setTeacherNominationId] = useState('');
	const [studentNominationId, setStudentNominationId] = useState('');
	const [chosenApplicant, setChosenApplicant] = useState({} as ApplicantInfo);

	const { data: votingInfo } = useQuery({
		queryKey: ['votingInfo'],
		queryFn: async () => {
			const res = await getVotingInfo();
			setTeacherNominationId(res.data.nominations[1].id);
			setStudentNominationId(res.data.nominations[0].id);
			return res.data;
		},
	});

	const { data: teachersNominationInfo } = useQuery({
		queryKey: ['teachersNominationInfo', votingInfo, teacherNominationId],
		queryFn: async () => {
			const res = await getNominationInfo(
				'Bearer ',
				votingInfo?.id,
				teacherNominationId
			);
			return res.data;
		},
		enabled: !!teacherNominationId && !!votingInfo,
	});

	const { data: studentsNominationInfo } = useQuery({
		queryKey: ['studentsNominationInfo', votingInfo, studentNominationId],
		queryFn: async () => {
			const res = await getNominationInfo(
				'Bearer ',
				votingInfo?.id,
				studentNominationId
			);
			return res.data;
		},
		enabled: !!teacherNominationId && !!votingInfo,
	});
	return (
		<section
			className={`${styles.mobileSelection} ${
				chosenApplicant.id && styles.mobileSelectionChosenMode
			}`}
		>
			<img src={leavesBackgroundSrc} className={styles.leavesBackground} />

			<img src={awardCupBackgroundSrc} className={styles.awardCupBackground} />

			<div
				className={`${styles.mobileSelectionContainer}  ${styles.mobileSelectionContainerChosenMode}`}
			>
				<img src={selectionTitleSrc} className={styles.mobileSelectionTitle} />

				{!chosenApplicant.id ? (
					<>
						<div className={styles.mobileSelectionNominationsChooser}>
							<button
								className={`${styles.mobileSelectionNominationButton} ${
									styles.mobileSelectionNominationButtonLeft
								} ${
									chosenNomination === 'teachers' &&
									styles.mobileSelectionNominationButtonActive
								}`}
								onClick={() => setChosenNomination('teachers')}
							>
								ПРЕПОДАВАТЕЛИ
							</button>
							<button
								className={`${styles.mobileSelectionNominationButton} ${
									styles.mobileSelectionNominationButtonRight
								} ${
									chosenNomination === 'students' &&
									styles.mobileSelectionNominationButtonActive
								}`}
								onClick={() => setChosenNomination('students')}
							>
								СТУДЕНТЫ
							</button>
						</div>

						<ul className={styles.mobileSelectionApplicantsList}>
							{chosenNomination === 'teachers'
								? teachersNominationInfo?.nominants.map((applicant) => {
										return (
											<Applicant
												key={applicant.id}
												fio={applicant.title}
												avatarSrc={applicant.cover_url}
												smallDescription={applicant.short_description}
												onClick={() => {
													setChosenApplicant(applicant);
												}}
											/>
										);
								  })
								: studentsNominationInfo?.nominants.map((applicant) => {
										return (
											<Applicant
												key={applicant.id}
												fio={applicant.title}
												avatarSrc={applicant.cover_url}
												smallDescription={applicant.short_description}
												onClick={() => setChosenApplicant(applicant)}
											/>
										);
								  })}
						</ul>
					</>
				) : (
					<>
						<div className={styles.mobileSelectionStudent}>
							<div className={styles.mobileSelectionStudentDiv}>
								<img
									src={chosenApplicant.cover_url}
									className={styles.mobileSelectionStudentAvatar}
								/>
							</div>
							<h2 className={styles.mobileSelectionStudentFIO}>
								{chosenApplicant.title}
							</h2>
							<p className={styles.mobileSelectionStudentDescriptionSmall}>
								{chosenApplicant.short_description}
							</p>
							<p className={styles.mobileSelectionStudentDescription}>
								{chosenApplicant.description}
							</p>

							<div className={styles.mobileSelectionStudentButtonsContainer}>
								<button className={styles.mobileSelectionStudentButton}>
									QR-код
								</button>
								<button className={styles.mobileSelectionStudentButton}>
									Вы проголосовали!
								</button>
							</div>
						</div>
						<button
							className={styles.mobileSelectionBackButton}
							onClick={() => setChosenApplicant({} as ApplicantInfo)}
						>
							Назад к списку
						</button>
					</>
				)}
			</div>
		</section>
	);
}
