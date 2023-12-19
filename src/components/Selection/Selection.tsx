/* eslint-disable no-mixed-spaces-and-tabs */
import styles from './Selection.module.scss';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/star2.svg';
import selectionTitleSrc from '../../assets/selection_title.svg';
import { useEffect, useState } from 'react';
import Applicant from '../Applicant';
import { useQuery } from '@tanstack/react-query';
import { getVotingInfo, getNominationInfo } from '../../api';
import VoteButton from '../VoteButton';

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

	const { data: teachersNominationInfo, isLoading: teachersLoading } = useQuery(
		{
			queryKey: ['teachersNominationInfo', votingInfo, teacherNominationId],
			queryFn: async () => {
				const res = await getNominationInfo(
					'Bearer ',
					votingInfo?.id,
					teacherNominationId
				);
				setChosenApplicant(res.data.nominants[0]);
				return res.data;
			},
			enabled: !!teacherNominationId && !!votingInfo,
		}
	);

	const { data: studentsNominationInfo, isLoading: studentsLoading } = useQuery(
		{
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
		}
	);

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

				{teachersLoading && studentsLoading ? (
					<div className={styles.selectionLoaderContainer}>
						<div className={styles.selectionLoader}></div>
					</div>
				) : (
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
							</div>
						</div>

						{chosenApplicant?.id && (
							<div className={styles.selectionApplicantInfoContainer}>
								<div className={styles.selectionApplicantContent}>
									<img
										className={styles.selectionApplicantAvatar}
										src={chosenApplicant.cover_url}
									/>

									<iframe
										src={`https://vk.com/video_ext.php?oid=-${chosenApplicant.video_url.slice(
											21,
											30
										)}&id=${chosenApplicant.video_url.slice(31, 40)}&hd=2`}
										width="1920"
										height="1080"
										allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
										allowFullScreen
										className={styles.selectionApplicantVideo}
									></iframe>
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

								{/* <button className={styles.selectionVoteButton}>
								Проголосовать
							</button> */}
								<VoteButton location={'selection'} />
							</div>
						)}
					</div>
				)}

				<p className={styles.selectionAnnotation}>
					*Вы можете отдать голос только за одного претендента в номинации
				</p>
			</div>
		</section>
	);
}
