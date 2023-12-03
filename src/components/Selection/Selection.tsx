import styles from './Selection.module.scss';

import leavesBackgroundSrc from '../../assets/leaves_background.svg';
import awardCupBackgroundSrc from '../../assets/award_cup_background.svg';
import selectionTitleSrc from '../../assets/selection_title.svg';
import testAvatarSrc from '../../assets/testAvatar.jpg';
import { useState } from 'react';
import Applicant from '../Applicant';

type SelectedNominationType = 'teacher' | 'student';

export function Selection() {
	const [selectedNomination, setSelectedNomination] =
		useState<SelectedNominationType>('teacher');
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
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
							<Applicant
								avatarSrc={testAvatarSrc}
								fio="Приходько Никита Алексеевич"
								smallDescription="Преподаватель кафедры МОСИТ"
							/>
						</div>
					</div>

					<div className={styles.selectionApplicantInfoContainer}>
						<div className={styles.selectionApplicantContent}>
							<img
								className={styles.selectionApplicantAvatar}
								src={testAvatarSrc}
							/>
						</div>

						<p className={styles.selectionApplicantFIO}>
							Приходько Никита Алексеевич
						</p>

						<p className={styles.selectionApplicantDescriptionSmall}>
							Преподаватель кафедры МОСИТ
						</p>

						<p className={styles.selectionApplicantDescription}>
							Lorem ipsum dolor sit amet consectetur. Sodales suspendisse a quis
							amet urna morbi sodales. Sed ipsum morbi tincidunt adipiscing
							montes. Eu donec nunc ultrices urna libero. Aliquam risus
							pellentesque justo dictum. Lorem ipsum dolor sit amet consectetur.
							Sodales suspendisse a quis amet urna morbi sodales. Sed ipsum
							morbi tincidunt adipiscing montes. Eu donec nunc ultrices urna
							libero. Aliquam risus pellentesque justo dictum.
						</p>

						<button className={styles.selectionVoteButton}>
							Проголосовать
						</button>
					</div>
				</div>

				<p className={styles.selectionAnnotation}>
					*Вы можете отдать голос только за одного претендента в номинации
				</p>
			</div>
		</section>
	);
}
