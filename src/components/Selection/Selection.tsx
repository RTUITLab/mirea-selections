import styles from './Selection.module.scss';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import selectionTitleSrc from '../../assets/selection_title.svg';
import { useEffect, useState } from 'react';
import Applicant from '../Applicant';
import { useQuery } from '@tanstack/react-query';
import { getVotingInfo, getNominationInfo } from '../../api';

type SelectedNominationType = 'teacher' | 'student';

interface ApplicantInfo {
	id: string;
	slug: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	video_url: string;
}

export function Selection() {
	const [selectedNomination, setSelectedNomination] =
		useState<SelectedNominationType>('teacher');
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
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjODJlOTkyLTc4MTEtNDBmYi1iMzg2LTFmZjQ3ZmI5MzE3ZiIsIm5hbWUiOiJcdTA0MWJcdTA0MzBcdTA0M2ZcdTA0NDJcdTA0MzVcdTA0MzIgXHUwNDE4XHUwNDMyXHUwNDMwXHUwNDNkIFx1MDQxMFx1MDQzYlx1MDQzNVx1MDQzYVx1MDQ0MVx1MDQzMFx1MDQzZFx1MDQzNFx1MDQ0MFx1MDQzZVx1MDQzMlx1MDQzOFx1MDQ0NyIsImVtYWlsIjoibGFwdGV2X2lAbWlyZWEucnUiLCJ1bml0IjpudWxsLCJleHAiOjE3MDE3MDU4NzZ9.9Nga-PHtZk-7nSzTTfDl8b73mBNPM_rIeZOSNRbyoAo',
				votingInfo?.id,
				teacherNominationId
			);
			setChosenApplicant(res.data.nominants[0]);
			return res.data;
		},
	});

	const { data: studentsNominationInfo } = useQuery({
		queryKey: ['studentsNominationInfo', votingInfo, studentNominationId],
		queryFn: async () => {
			const res = await getNominationInfo(
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjODJlOTkyLTc4MTEtNDBmYi1iMzg2LTFmZjQ3ZmI5MzE3ZiIsIm5hbWUiOiJcdTA0MWJcdTA0MzBcdTA0M2ZcdTA0NDJcdTA0MzVcdTA0MzIgXHUwNDE4XHUwNDMyXHUwNDMwXHUwNDNkIFx1MDQxMFx1MDQzYlx1MDQzNVx1MDQzYVx1MDQ0MVx1MDQzMFx1MDQzZFx1MDQzNFx1MDQ0MFx1MDQzZVx1MDQzMlx1MDQzOFx1MDQ0NyIsImVtYWlsIjoibGFwdGV2X2lAbWlyZWEucnUiLCJ1bml0IjpudWxsLCJleHAiOjE3MDE3MDU4NzZ9.9Nga-PHtZk-7nSzTTfDl8b73mBNPM_rIeZOSNRbyoAo',
				votingInfo?.id,
				studentNominationId
			);
			return res.data;
		},
	});

	useEffect(() => {
		if (selectedNomination === 'student') {
			setChosenApplicant(studentsNominationInfo?.nominants[0] as ApplicantInfo);
		} else {
			setChosenApplicant(teachersNominationInfo?.nominants[0] as ApplicantInfo);
		}
	}, [selectedNomination]);

	return (
		<section className={styles.selection}>
			<img src={leavesBackgroundSrc} className={styles.leavesBackground} />

			<img src={awardCupBackgroundSrc} className={styles.awardCupBackground} />
			<div className={styles.selectionContainer}>
				<img src={selectionTitleSrc} className={styles.selectionTitle} />

				<div className={styles.selectionContent}>
					<div className={styles.selectionApplicantsListContainer}>
						<nav className={styles.selectionNominations}>
							<button
								className={`${styles.selectionNomination} ${
									styles.selectionNominationLeft
								} ${
									selectedNomination === 'teacher' &&
									styles.selectionNominationActive
								}`}
								onClick={() => setSelectedNomination('teacher')}
							>
								ПРЕПОДАВАТЕЛИ
							</button>
							<button
								className={`${styles.selectionNomination} ${
									styles.selectionNominationRight
								} ${
									selectedNomination === 'student' &&
									styles.selectionNominationActive
								}`}
								onClick={() => setSelectedNomination('student')}
							>
								СТУДЕНТЫ
							</button>
						</nav>

						<div className={styles.selectionApplicantsList}>
							{selectedNomination === 'teacher'
								? teachersNominationInfo?.nominants.map((applicant) => {
										return (
											<Applicant
												key={applicant.id}
												fio={applicant.title}
												avatarSrc={applicant.cover_url}
												smallDescription={applicant.short_description}
												onClick={() => setChosenApplicant(applicant)}
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
						</div>
					</div>

					{chosenApplicant?.id && (
						<div className={styles.selectionApplicantInfoContainer}>
							<div className={styles.selectionApplicantContent}>
								<img
									className={styles.selectionApplicantAvatar}
									src={chosenApplicant.cover_url}
								/>
							</div>

							<p className={styles.selectionApplicantFIO}>
								{chosenApplicant.title}
							</p>

							<p className={styles.selectionApplicantDescriptionSmall}>
								{chosenApplicant.short_description}
							</p>

							<p className={styles.selectionApplicantDescription}>
								{chosenApplicant.description}
							</p>

							<button className={styles.selectionVoteButton}>
								Проголосовать
							</button>
						</div>
					)}
				</div>

				<p className={styles.selectionAnnotation}>
					*Вы можете отдать голос только за одного претендента в номинации
				</p>
			</div>
		</section>
	);
}
