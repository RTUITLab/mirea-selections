import styles from './SelectionInfo.module.scss';
import { useNavigate } from 'react-router';

export function SelectionInfo() {
	const navigate = useNavigate();

	function handleRedirectButtonClick() {
		navigate('/selection');
	}
	return (
		<section id="selectionInfo" className={styles.selectionInfo}>
			<div className={styles.selectionInfoContainer}>
				<h2 className={styles.selectionInfoTitle}>
					МИРЭА — Российский технологический университет объявляет о старте
					этапа голосования в рамках конкурса «Студент и преподаватель года».
				</h2>

				<ul className={styles.selectionInfoRules}>
					<li className={styles.selectionInfoRule}>
						<p className={styles.selectionInfoRuleText}>
							Конкурс проводится по итогам одного года —{' '}
							<span className={styles.selectionInfoRuleTextBold}>
								с 22 ноября 2022 г. по 03 декабря 2023 г
							</span>
							.
						</p>
					</li>
					<li className={styles.selectionInfoRule}>
						<p className={styles.selectionInfoRuleText}>
							По итогу в рамках каждой номинации будет выбрано{' '}
							<span className={styles.selectionInfoRuleTextBold}>
								3 финалиста
							</span>
							, набравших наибольшее число голосов по итогам голосования и
							собеседований конкурсантов.
						</p>
					</li>
					<li className={styles.selectionInfoRule}>
						<p className={styles.selectionInfoRuleText}>
							Призовой фонд составляет более{' '}
							<span className={styles.selectionInfoRuleTextBold}>
								1 000 000
							</span>{' '}
							рублей!
						</p>
					</li>
					<li className={styles.selectionInfoRule}>
						<p className={styles.selectionInfoRuleText}>
							В нём{' '}
							<span className={styles.selectionInfoRuleTextBold}>
								принимают участие ВСЕ
							</span>
							: студенты очной формы обучения (бакалавры, специалисты,
							магистры), студенты Колледжа и преподаватели Университета.
						</p>
					</li>
					<li className={styles.selectionInfoRule}>
						<p className={styles.selectionInfoRuleText}>
							<span className={styles.selectionInfoRuleTextBold}>
								У каждого из вас
							</span>{' '}
							есть возможность проголосовать по двум номинациям Конкурса за
							того, кто станет лучшим из лучших!
						</p>
					</li>
				</ul>

				<button
					className={styles.selectionInfoRedirectButton}
					onClick={handleRedirectButtonClick}
				>
					Хочу голосовать!
				</button>
			</div>
		</section>
	);
}
