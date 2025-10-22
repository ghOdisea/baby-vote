import { Vote } from "../../core/vote";

export interface VoteRepository {
  fetchVotes(limit?: number): Promise<Vote[]>;
  createVote(vote: Omit<Vote, 'id'|'createdAt'>): Promise<Vote>;
  fetchStats(): Promise<Array<{ option: string; count: number }>>;
}

export class InMemoryVoteRepository implements VoteRepository {
  private votes: Vote[] = [];

  async fetchVotes(limit = 100): Promise<Vote[]> {
    return this.votes.slice(0, limit);
  }

  async createVote(v: Omit<Vote, 'id'|'createdAt'>): Promise<Vote> {
    const newVote = new Vote(
      crypto.randomUUID(),
      v.name,
      v.countryCode,
      v.option,
      new Date()
    );
    this.votes.unshift(newVote);
    return newVote;
  }

  async fetchStats(): Promise<Array<{ option: string; count: number }>> {
    const map = new Map<string, number>();
    for (const v of this.votes) map.set(String(v.option), (map.get(String(v.option)) ?? 0) + 1);
    return [...map.entries()].map(([option, count]) => ({ option, count })).sort((a,b)=>a.option.localeCompare(b.option));
  }
}
