import axios from 'axios';

axios.defaults.baseURL = 'https://vote.rtuitlab.dev/api/votings';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

interface NominationInfo {
	id: string;
	title: string;
}

interface VotingInfoResponse {
	id: string;
	creation_date: string;
	title: string;
	description: string;
	active: boolean;
	start_date: string;
	finish_date: string;
	nominations: NominationInfo[];
}

interface ApplicantInfo {
	id: string;
	slug: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	video_url: string;
}

interface UserVote {
	id: string;
	nominant_id: string;
	nomination_id: string;
	voted_date: string;
}

interface NominationInfoResponse {
	id: string;
	title: string;
	nominants: ApplicantInfo[];
	vote: UserVote | null;
}

export function getVotingInfo() {
	return axios.get<VotingInfoResponse>('/active');
}

export function getNominationInfo(
	jwt: string,
	voting_id: string | undefined,
	nomination_id: string
) {
	return axios.get<NominationInfoResponse>(
		`/${voting_id}/nominations/${nomination_id}`,
		{
			headers: {
				Authorization: jwt,
			},
		}
	);
}
// export function getVotingInfo() {
// 	return fetch(`${BASE_URL}/active`, {
// 		method: 'GET',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json',
// 		},
// 	})
// 		.then((res) => {
// 			if (res.ok) {
// 				return res.json();
// 			}
// 			return Promise.reject(`Ошибка ${res.status}`);
// 		})
// 		.then((res) => res);
// }
