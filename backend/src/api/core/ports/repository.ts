import { Vote }  from "../../core/vote"

export interface VoteRepository {
      fetchVotes(): Promise<Vote[]>;
      createVote(vote: Vote): Promise<Vote>;
}

export class InMemoryVoteRepository implements VoteRepository {
      private votes: Vote[] = [];

      async fetchVotes(): Promise<Vote[]> {
            return this.votes;
      }

      async createVote(vote: Vote): Promise<Vote> {
            this.votes.push(vote);
            return vote;
      }
}