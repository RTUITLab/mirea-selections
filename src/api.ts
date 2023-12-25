import axios from 'axios';

axios.defaults.baseURL = 'https://vote.rtuitlab.dev/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
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
	return axios.get<VotingInfoResponse>('votings/active');
}

export function getNominationInfo(
	jwt: string,
	voting_id: string | undefined,
	nomination_id: string
) {
	return axios.get<NominationInfoResponse>(
		`votings/${voting_id}/nominations/${nomination_id}`,
		{
			headers: {
				Authorization: jwt,
			},
		}
	);
}

interface NominationInfo {
	nomination_id: string;
	nominant_id: string;
}

export function userVote(
	voting_id: string,
	nomination_id: string,
	nominant_id: string,
	jwt: string
) {
	console.log(nomination_id);
	console.log(nominant_id);
	return axios.post(
		`votings/${voting_id}/vote`,
		{
			nomination_id: nomination_id,
			nominant_id: nominant_id,
		},
		{
			headers: {
				Authorization: jwt,
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json; charset=UTF-8',
			},
		}
	);
}
