import { Vote } from "../core/vote";
import { PgVoteRepo } from "../db/pg.repo";

const repo = new PgVoteRepo();

export const getServiceHealth = async () => 'GET service is healthy';

export async function getVotes(limit?: number): Promise<Vote[]> {
  return repo.fetchVotes(limit);
}

export async function createVote(input: { name: string; countryCode: string; option: string; }): Promise<Vote> {
  return repo.createVote({
    name: input.name,
    countryCode: input.countryCode,
    option: input.option
  } as Omit<Vote, 'id'|'createdAt'>);
}

export async function getStats(): Promise<Array<{ option: string; count: number }>> {
  return repo.fetchStats();
}
