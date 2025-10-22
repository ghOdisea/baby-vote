import { VoteDTO } from './vote';

export interface RealtimeEvent {
type: 'vote_created';
data: VoteDTO;
}