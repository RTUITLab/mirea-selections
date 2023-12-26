/* eslint-disable no-mixed-spaces-and-tabs */
import styles from './MobileSelection.module.scss';
import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import selectionTitleSrc from '../../assets/selection_title.svg';
import { useEffect, useState } from 'react';
import Applicant from '../Applicant';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNominationInfo, getVotingInfo, userVote } from '../../api';
import VoteButton from '../VoteButton';
import { SelectionModal } from '../Selection/SelectionModal';

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
	const [showModal, setShowModal] = useState(false);
	const searchParams = new URLSearchParams(window.location.search);
	const queryClient = useQueryClient();
	const currentTime = new Date().toISOString();
	const currentDay = currentTime.split('T')[0].slice(8);
	const currentHour = currentTime.split('T')[1].slice(0, 2);

	useEffect(() => {
		setChosenApplicant({} as ApplicantInfo);
	}, []);

	console.log(chosenApplicant);

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
				sessionStorage.getItem('token')
					? 'Bearer ' + sessionStorage.getItem('token')
					: 'Bearer ',
				votingInfo?.id,
				teacherNominationId
			);
			//setChosenApplicant(res.data.nominants[0]);
			return res.data;
		},
		enabled: !!teacherNominationId && !!votingInfo,
	});

	const { data: studentsNominationInfo } = useQuery({
		queryKey: ['studentsNominationInfo', votingInfo, studentNominationId],
		queryFn: async () => {
			const res = await getNominationInfo(
				sessionStorage.getItem('token')
					? 'Bearer ' + sessionStorage.getItem('token')
					: 'Bearer ',
				votingInfo?.id,
				studentNominationId
			);
			return res.data;
		},
		enabled: !!teacherNominationId && !!votingInfo,
	});

	const { mutate: handleUserVote } = useMutation({
		mutationFn: async (nomination_id: string) => {
			const resp = await userVote(
				votingInfo?.id || '',
				nomination_id,
				chosenApplicant.id,
				'Bearer ' + sessionStorage.getItem('token') || ''
			);
			return resp;
		},
		onSuccess: () => {
			let votesCount = 0;
			if (teachersNominationInfo?.vote) votesCount++;
			if (studentsNominationInfo?.vote) votesCount++;
			
			if (votesCount === 0) {
				// Show modal
				setShowModal(true);
			}

			queryClient.invalidateQueries({
				queryKey: ['studentsNominationInfo', votingInfo, studentNominationId],
			});
			queryClient.invalidateQueries({
				queryKey: ['studentsNominationInfo', votingInfo, studentNominationId],
			});
		},
		onError: () => {
			console.log('error');
		},
	});

	function handleRedirect() {
		if (!sessionStorage.getItem('token')) {
			window.location.href = `${
				import.meta.env.VITE_BASE_URL
			}auth/login?redirect_url=${window.location.href}`;
		} else {
			const nominationId =
				chosenNomination === 'students'
					? studentNominationId
					: teacherNominationId;
			handleUserVote(nominationId);
		}
	}

	useEffect(() => {
		if (searchParams.get('token') && !sessionStorage.getItem('token')) {
			sessionStorage.setItem('token', searchParams.get('token') || '');
			const urlParams = new URLSearchParams(window.location.href);
			urlParams.delete('token');
		}
	}, []);

	function getButtonText() {
		if (chosenNomination === 'teachers') {
			if (teachersNominationInfo?.vote === null) {
				return 'Проголосовать';
			}
			return 'Вы проголосовали!';
		} else {
			if (studentsNominationInfo?.vote === null) {
				return 'Проголосовать';
			}
			return 'Вы проголосовали!';
		}
	}

	function showButton() {
		if (votingInfo) {
			if (
				parseInt(currentDay) <
					parseInt(votingInfo?.start_date.split('T')[0].slice(8)) ||
				parseInt(currentDay) >
					parseInt(votingInfo?.finish_date.split('T')[0].slice(8))
			) {
				return false;
			} else {
				if (
					parseInt(currentDay) ===
					parseInt(votingInfo?.start_date.split('T')[0].slice(8))
				) {
					if (
						parseInt(currentHour) <
						parseInt(votingInfo.start_date.split('T')[1].slice(0, 2))
					) {
						return false;
					} else {
						return true;
					}
				}

				if (
					parseInt(currentDay) ===
					parseInt(votingInfo?.finish_date.split('T')[0].slice(8))
				) {
					if (
						parseInt(currentHour) >=
						parseInt(votingInfo.finish_date.split('T')[1].slice(0, 2))
					) {
						return false;
					} else {
						return true;
					}
				}

				return true;
			}
		} else {
			return false;
		}
	}

	return (
		<section
			className={`${styles.mobileSelection} ${
				chosenApplicant.id && styles.mobileSelectionChosenMode
			}`}
		>
			{showModal && <SelectionModal onCloseModal={() => setShowModal(false)}></SelectionModal>}

			<img src={leavesBackgroundSrc} className={styles.leavesBackground} />

			<img src={awardCupBackgroundSrc} className={styles.awardCupBackground} />

			<div
				className={`${styles.mobileSelectionContainer}  ${styles.mobileSelectionContainerChosenMode}`}
			>
				<img src={selectionTitleSrc} className={styles.mobileSelectionTitle} />

				{Object.keys(chosenApplicant).length === 0 ? (
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
												grayscale={teachersNominationInfo?.vote ? teachersNominationInfo?.vote.nominant_id !== applicant.id : false}
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
												grayscale={studentsNominationInfo?.vote ? studentsNominationInfo?.vote.nominant_id !== applicant.id : false}
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
							{chosenApplicant && (
								<iframe
									src={`https://vk.com/video_ext.php?oid=-${chosenApplicant.video_url.slice(
										21,
										30
									)}&id=${chosenApplicant.video_url.slice(31, 40)}&hd=2`}
									width="1920"
									height="1080"
									allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
									allowFullScreen
									className={styles.mobileSelectionApplicantVideo}
								></iframe>
							)}

							<p className={styles.mobileSelectionStudentDescription}>
								{chosenApplicant.description}
							</p>

							<div className={styles.mobileSelectionStudentButtonsContainer}>
								{/* <button className={styles.mobileSelectionStudentButton}>
									Вы проголосовали!
								</button> */}
								{showButton() && (
									<VoteButton
										location="mobileSelection"
										buttonText={getButtonText()}
										onVoteClick={handleRedirect}
									/>
								)}
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
